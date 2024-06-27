<template>
  <div>
    <File :accept="accept" @onFile="onFile">
      <template #content="{ onClick, onClear }">
        <div class="file-upload-wrap">
          <TextField
            v-model="fileName"
            class="file-upload-text mr-2"
            :hide-details="true"
            :read-only="true"
          />
          <template v-if="mode == FILE_UPLOAD_MODE.ADD">
            <AppBtn class="append-btn" @click="onClick">{{ $t('act.select') }}</AppBtn>
          </template>
          <template v-else-if="mode == FILE_UPLOAD_MODE.VIEW">
            <div class="append-btn">
              <IconWrap class="cursor-pointer mr-1" :icon="'mdi-close'" @click.native.stop="clear(onClear)" />
              <AppBtn @click="onView">{{ $t('act.view') }}</AppBtn>
            </div>
          </template>
        </div>
      </template>
    </File>
  </div>
</template>
<script>
import File from './File';

import { FILE_UPLOAD_MODE } from '@/common/enum';
export default {
  name: 'FileUpload',
  components: {
    File,
  },
  props: {
    mode: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      accept: '.pdf',
    };
  },
  computed: {
    fileName() {
      return this.value?.name;
    },
    computedFileName: {
      get() {
        return this.fileName;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    FILE_UPLOAD_MODE() {
      return FILE_UPLOAD_MODE;
    },
  },
  methods: {
    clear(clearCb) {
      clearCb();
      this.$emit('onClear');
    },
    onView() {
      window.open(this.value.url, '_blank');
    },
    onFile(data) {
      this.$emit('onFile', data);
    },
  },
};
</script>
<style lang="scss" scoped>
.file-upload-wrap {
  position: relative;
  .file-upload-text::v-deep {
    .v-input {
      .v-text-field__slot {
        flex: unset;
        input {
          width: 65%;
        }
      }
    }
  }
}
.append-btn {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
