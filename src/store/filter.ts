import { Store } from "@tanstack/react-store";

interface FilterState {
  isArchivedView: boolean;
  selectedTag: string;
  searchFilter: string;
}

const initialState: FilterState = {
  isArchivedView: false,
  selectedTag: "",
  searchFilter: "",
};

const filterStore = new Store<FilterState>(initialState);

function setArchivedView({ archivedView }: { archivedView: boolean }) {
  filterStore.setState((state) => {
    return {
      ...state,
      isArchivedView: archivedView,
    };
  });
}

function setSelectedTag({ selectedTag }: { selectedTag: string }) {
  filterStore.setState((state) => {
    return {
      ...state,
      selectedTag,
    };
  });
}

function setSearchFilter({ searchFilter }: { searchFilter: string }) {
  filterStore.setState((state) => {
    return {
      ...state,
      searchFilter,
    };
  });
}

function resetFilters() {
  filterStore.setState((state) => {
    return {
      ...state,
      selectedTag: initialState.selectedTag,
      searchFilter: initialState.searchFilter,
    };
  });
}

export {
  filterStore,
  resetFilters,
  setArchivedView,
  setSearchFilter,
  setSelectedTag,
};
