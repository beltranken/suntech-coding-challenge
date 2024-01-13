<template>
  <div class="wrapper">
    <div class="header">
      <h1>Sign Up</h1>
    </div>
    <KFormElement>
      <json-forms
        :data="data"
        :renderers="renderers"
        :schema="schema"
        :uischema="uischema"
        @change="onChange"
        validation-mode="ValidateAndShow"
        :i18n="{ translate: translator }"
      />
    </KFormElement>
    <div class="bottom">
      <KButton :theme-color="'primary'" :disabled="hasError">Sign up</KButton>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { JsonForms, type JsonFormsChangeEvent } from "@jsonforms/vue";
  import { vanillaRenderers } from "@jsonforms/vue-vanilla";
  import { Button as KButton } from "@progress/kendo-vue-buttons";
  import { FormElement as KFormElement } from "@progress/kendo-vue-form";

  import { entry as TextRenderer } from "@/renderers/TextRenderer.vue";
  import { entry as DateRenderer } from "@/renderers/DateRenderer.vue";
  import { formatDate } from '@/util/formatDate';

  const minimumDate = new Date();
  minimumDate.setFullYear(minimumDate.getFullYear() - 18);

  const renderers = [
    ...vanillaRenderers,
    { tester: TextRenderer.tester, renderer: TextRenderer.renderer },
    { tester: DateRenderer.tester, renderer: DateRenderer.renderer },
  ];

  const schema = {
    properties: {
      firstName: {
        type: "string",
        minLength: 1,
      },
      lastName: {
        type: "string",
        minLength: 1,
      },
      birthday: {
        type: "string",
        format: "date",
      },
      email: {
        type: "string",
        minLength: 1,
        pattern: "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
      },
    },
    required: [
      "firstName",
      "lastName",
      "birthday",
      "email",
    ],
  };

  const uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/firstName",
      },
      {
        type: "Control",
        scope: "#/properties/lastName",
      },
      {
        type: "Control",
        scope: "#/properties/birthday",
      },
      {
        type: "Control",
        scope: "#/properties/email",
        option: {
          visible: false,
        },
        rule: {
          effect: "SHOW",
          condition: {
            scope: "#",
            schema: {
              properties: {
                birthday: {
                  format: "date",
                  formatExclusiveMaximum: formatDate(minimumDate),
                }
              },
              required: ["birthday"],
            },
          }
        }
      },
    ],
  };

  const translator: any = (key: string, defaultMessage: string | undefined) => {
    if (key === 'error.pattern') {
      defaultMessage = "Invalid format";
    } else if (key === 'error.required') {
      defaultMessage = "Field is required";
    } else if (key === 'error.minLength') {
      defaultMessage = "Field is required";
    }

    return defaultMessage;
  };

  export default defineComponent({
    name: "App",
    components: {
      JsonForms,
      KButton,
      KFormElement
    },
    data() {
      return {
        // freeze renderers for performance gains
        renderers: Object.freeze(renderers),
        data: {
        },
        schema,
        uischema,
        translator,
        hasError: false,
      };
    },
    methods: {
      onChange(event: JsonFormsChangeEvent) {
        this.data = event.data;
        this.hasError = Array.isArray(event.errors) && event.errors.length > 0;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: white;
    text-align: center;
    border-radius: 25px;

    .header {
      width: 100%;
      padding: 20px 50px;
    }

    .k-form {
      padding: 0 50px;
    }
    
    .bottom {
      width: 100%;
      padding: 0px 50px 25px 50px;

      .k-button {
        width: 100%;
      }
    }
  } 
</style>