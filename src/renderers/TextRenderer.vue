<script lang="ts">
import { and, isDateControl, isStringControl, not, rankWith } from "@jsonforms/core";
import type { ControlElement, JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import { defineComponent } from "vue";
import {
  rendererProps,
  useJsonFormsControl,
  type RendererProps,
} from "@jsonforms/vue";
import { TextBox as KTextBox } from "@progress/kendo-vue-inputs";
import { Label as KLabel, Error as KError } from '@progress/kendo-vue-labels';
import { FieldWrapper as KFieldWrapper } from "@progress/kendo-vue-form";

const renderersText  = defineComponent({
    name: 'renderers-text',
    props: {
      ...rendererProps<ControlElement>(),
    },
    setup (props: RendererProps<ControlElement>) {
      return useJsonFormsControl(props)
    },
    methods: {
      onChange(event: Event) {
        this.handleChange(
          this.control.path,
          (event.target as HTMLInputElement).value
        );
      },
    },
    components: {
      KTextBox,
      KLabel,
      KError,
      KFieldWrapper,
    },
});

export default renderersText;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: renderersText,
  tester: rankWith(3, and(isStringControl, not(isDateControl))),
};
</script>

<template>
  <KFieldWrapper class="control" v-if="control.visible">
    <KLabel :editor-id="control.id + '-input'" :editor-valid="control.data == undefined || !control.errors">{{ control.label }}</KLabel>
    <KTextBox 
      :id="control.id + '-input'"
      :value="control.data"
      :disabled="!control.enabled"
      :valid="control.data == undefined || !control.errors"
      @change="onChange"
      @input="onChange"
    ></KTextBox>
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