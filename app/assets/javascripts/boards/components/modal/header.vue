<script>
import ModalFilters from './filters';
import ModalTabs from './tabs.vue';
import ModalStore from '../../stores/modal_store';
import modalMixin from '../../mixins/modal_mixins';

export default {
  components: {
    ModalTabs,
    ModalFilters,
  },
  mixins: [modalMixin],
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    milestonePath: {
      type: String,
      required: true,
    },
    labelPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return ModalStore.store;
  },
  computed: {
    selectAllText() {
      if (ModalStore.selectedCount() !== this.issues.length || this.issues.length === 0) {
        return 'Select all';
      }

      return 'Deselect all';
    },
    showSearch() {
      return this.activeTab === 'all' && !this.loading && this.issuesCount > 0;
    },
  },
  methods: {
    toggleAll() {
      this.$refs.selectAllBtn.blur();

      ModalStore.toggleAll();
    },
  },
};
</script>
<template>
  <div>
    <header class="add-issues-header form-actions">
      <h2>
        Add issues
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="toggleModal(false)"
        >
          <span aria-hidden="true">×</span>
        </button>
      </h2>
    </header>
    <modal-tabs v-if="!loading && issuesCount > 0" />
    <div v-if="showSearch" class="add-issues-search append-bottom-10">
      <modal-filters :store="filter" />
      <button
        ref="selectAllBtn"
        type="button"
        class="btn btn-success btn-inverted prepend-left-10"
        @click="toggleAll"
      >
        {{ selectAllText }}
      </button>
    </div>
  </div>
</template>
