<template>
  <div>
    <div>
      <input id="file-upload" ref="file" class="d-none" type="file" :accept="accept" :multiple="multiple" @change="onFile" />
      <slot name="content" v-bind="{ onClick, onClear }"> </slot>
    </div>
    <div v-if="error" class="v-messages error--text text-start px-3 pt-2">
      {{ error }}
    </div>
  </div>
</template>
<script>
import filesize from 'filesize';

export default {
  name: 'File',
  props: {
    accept: {
      type: String,
      default: '.pdf,.png,.jpg,.jpeg',
    },
    maxSize: {
      type: Number,
      default: 5 * 1024 * 1024, // 5MB
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
      files: [],
    };
  },
  methods: {
    onClick() {
      this.$refs.file.click();
    },
    _handleFiles(files) {
      this.error = null;
      const isValid = this.validate(files);

      if (!isValid) return (this.$refs.file.value = '');

      const data = Array.from(files);
      this.files = data;

      this.$emit('onFile', data);
    },
    onClear() {
      this.$refs.file.value = '';
      this.files = [];
      this.error = null;
    },
    isValidFileType(file) {
      const extension = `.${file.name
        .split('.')
        .pop()
        .toLowerCase()}`;
      return -1 == this.accept.split(',').indexOf(extension) ? false : true;
    },
    onFile(event) {
      const files = event.target.files;
      if (this.isUndefinedNullOrEmpty(files)) return;
      this._handleFiles(files);
    },
    validate(files = []) {
      const res = this.validator(files);
      if (!res.isValid) this.error = res.error;
      return res.isValid;
    },
    validator(files = []) {
      const response = {
        isValid: true,
        error: null,
      };

      if (this.isUndefinedNullOrEmpty(files)) {
        response.isValid = false;
        response.error = this.$t('lbl.pleaseSelectFile');
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (!this.isValidFileType(file)) {
            response.error = this.$t('err.lbl.invalidFileType', { value: this.accept });
            response.isValid = false;
            break;
          }

          if (file.size > this.maxSize) {
            response.isValid = false;
            response.error = this.$t('err.lbl.uploadMaxSize', { value: filesize(this.maxSize) });
            break;
          }
        }
      }

      return response;
    },
  },
};
</script>
