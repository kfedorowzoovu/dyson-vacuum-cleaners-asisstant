<script lang="ts">
import { Vue } from "@zoovu/runner-browser-api";

export default Vue.extend({
  name: "InvisibleWrapper",
  functional: true,
  render(h, { children }) {
    return children.length === 1 ? children[0] : children;
  },
});
</script>
