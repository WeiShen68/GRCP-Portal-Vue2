<template>
  <div class="wrapper" :class="{ 'wrapper-block': notAllowed }">
    <!-- <div v-if="displayLabel || label" class="mb-1">
      <span class="text-label">{{ displayLabel ? displayLabel : label }}{{ mandatory ? '*' : '' }}</span>
    </div> -->
    <ValidationProvider :name="label" :mode="mode" :rules="rules" v-slot="{ errors }">
      <v-btn-toggle
        @change="$emit('change')"
        class="toggle-wrap d-flex flex-wrap"
        :class="{ 'toggle-wrap-block': notAllowed }"
        v-model="inputValue"
        group
        :mandatory="mandatory"
      >
        <template v-for="(item, index) in options">
          <v-btn :value="dynamicFormat ? item.v : item.value" :disabled="disabled" :key="index" :height="38">
            {{ dynamicFormat ? item.t : item.text }}
          </v-btn>
        </template>
      </v-btn-toggle>
      <div v-if="errors[0]" class="error-text">{{ errors[0] }}</div>
    </ValidationProvider>
  </div>
</template>
<script>
export default {
  name: 'BtnGroup',
  props: {
    defaultValue: {
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dynamicFormat: {
      // when in dynamicFormat, item.value -> item.v, item.text -> item.t
      type: Boolean,
      default: false,
    },
    // displayLabel: {
    //   // for display only
    //   type: String,
    //   default: '',
    // },
    label: {
      // for validation error
      type: String,
      default: '',
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    mode: {
      // validation mode
      type: String,
      default: 'passive',
    },
    notAllowed: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      // 'required|email'
      default: () => {
        return {};
      },
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: [String, Number, Array], //Pending API, temporarily add type: Array to avoid errors
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        // console.log('value', value);
        if (value === undefined) {
          value = this.defaultValue;
        }
        this.$emit('input', value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper.wrapper-block {
  cursor: not-allowed;
}

.toggle-wrap.v-btn-toggle {
  height: 100%;
  width: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: 2px;

  &.toggle-wrap-block {
    pointer-events: none;
  }

  .v-btn.theme--light {
    margin: 0px;

    &:not(.v-btn--active) {
      border: 1px solid #c3c3c3;
    }
  }
  .v-btn--active {
    background-color: #000 !important;
    color: #ffffff;

    &.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background-color: #000 !important;
      opacity: 0.7;
    }

    &.v-btn--disabled {
      color: #ffffff !important;
    }
  }
}
.error-text {
  height: 12px;
}
</style>
