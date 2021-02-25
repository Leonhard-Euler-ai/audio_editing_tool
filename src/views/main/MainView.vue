<template>
  <div>
    <MainViewHeader/>
    <!--    <Upload/>-->
    <Edit/>
    <MainViewFooter :isDisabled="nextIsDisabled"/>
  </div>
</template>

<script>
  import MainViewHeader from "./mainViewComps/MainViewHeader";
  import MainViewFooter from "./mainViewComps/MainViewFooter";

  import Upload from "./mainViewComps/mainViewCenter/upload/Upload";
  import Edit from "./mainViewComps/mainViewCenter/edit/Edit";

  export default {
    name: "Main",
    data() {
      return {
        nextIsDisabled: false
      }
    },
    components: {
      MainViewHeader,
      MainViewFooter,
      Upload,
      Edit
    }
  }
</script>

<style scoped>

</style>
