export default {
  "& .modal-enter, & .modal-leave-active": {
    opacity: 0,
  },
  "& .modal-enter .modal-container, & .modal-leave-active .modal-container": {
    transform: "scale(1.1)",
  },
  "& .expand-enter-active, & .expand-leave-active": {
    transition: "all 00.1s ease",
  },
  "& .expand-enter, & .expand-leave": {
    height: 0,
    opacity: 0,
  },
  "& .fade-enter-active, & .expand-leave-active": {
    transition: "opacity 00.1s ease",
  },
  "& .fade-enter, & .fade-leave-to, & .fade-leave-active": {
    opacity: 0,
  },
};
