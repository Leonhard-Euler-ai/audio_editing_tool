<template>
  <div class="scrollBar">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ScrollBar"
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
    margin: 0 1px;
    width: 160px;
    height: 90px;
    background-color: lightseagreen;
  }
</style>
