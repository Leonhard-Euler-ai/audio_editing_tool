<template>
  <div class="scrollBar">
    <ul>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
      <li>
        <ScrollBarTips/>
      </li>
    </ul>
  </div>
</template>

<script>
  import ScrollBarTips from "./ScrollBarTips";
  export default {
    name: "ScrollBar",
    components: {
      ScrollBarTips
    }
  }
</script>

<style scoped>
  .scrollBar {
    position: fixed;
    bottom: 12%;
    width: 100%;
    height: 100px;
    padding: 10px 30px;
  }

  ul {
    white-space: nowrap;
    overflow-x: scroll;
  }

  li {
    display: inline-block;
    margin: 0 3px;
    width: 160px;
    height: 90px;
  }

  li:hover {
    position: relative;
    top: -2px;
    left: -2px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, .3);
  }
</style>
