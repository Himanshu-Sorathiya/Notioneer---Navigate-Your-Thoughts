const modalIds = [
  "discard_changes",
  "confirm_delete",
  "confirm_archive",
] as const;

type ModalId = (typeof modalIds)[number];

export { type ModalId, modalIds };

