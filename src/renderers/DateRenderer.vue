<script lang="ts">
import { isDateControl, rankWith } from "@jsonforms/core";
import type { ControlElement, JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { defineComponent } from "vue";
import {
  rendererProps,
  useJsonFormsControl,
  type RendererProps,
} from "@jsonforms/vue";
import { Label as KLabel, Error as KError } from '@progress/kendo-vue-labels';
import { DatePicker as KDatePicker } from '@progress/kendo-vue-dateinputs';
import { FieldWrapper as KFieldWrapper } from "@progress/kendo-vue-form";

const renderersDate  = defineComponent({
    name: 'renderers-date',
    props: {
      ...rendererProps<ControlElement>(),
    },
    setup (props: RendererProps<ControlElement>) {
      return useJsonFormsControl(props)
    },
    methods: {
      onChange(event: Event) {
        let value: any = (event.target as HTMLInputElement).value;

        if (value instanceof Date) {
          const yyyy = ('0000' + value.getFullYear()).slice(-4);
          const mm = ('0' + (value.getMonth() + 1)).slice(-2);
          const dd = ('0' +(value.getDate())).slice(-2);

          this.rawData = value;

          this.handleChange(
            this.control.path,
            `${yyyy}-${mm}-${dd}`
          );
        }
      },
    },
    components: {
      KLabel,
      KError,
      KDatePicker,
      KFieldWrapper,
    },
    data() {
      return {
        rawData: undefined as unknown,
      };
    },
});

export default renderersDate;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: renderersDate,
  tester: rankWith(3, isDateControl),
};
</script>

<template>
  <KFieldWrapper class="control" v-if="control.visible">
    <KLabel :editor-id="control.id + '-input'" :editor-valid="control.data == undefined || !control.errors">{{ control.label }}</KLabel>
    <KDatePicker 
      v-if="control.schema.format === 'date'"
      :id="control.id + '-input'"
      :value="rawData"
      :disabled="!control.enabled"
      :required="control.required"
      :valid="control.data == undefined || !control.errors"
      @change="onChange"
    ></KDatePicker>
    <KError v-if="control.data != undefined && control.errors" class="error">
      {{ control.errors.split('\n')[0] }}
    </KError>
  </KFieldWrapper>
</template>

<style lang="scss" scoped>
  div.control.k-form-field {
    position: relative;
    margin-bottom: 3px;
    padding-bottom: 15px;

    .k-input {
      width: 250px;
      margin: 5px 0;
    }

    label {
      font-weight: bold;
    }

    .k-form-error {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
</style>