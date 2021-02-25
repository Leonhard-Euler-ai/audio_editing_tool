<template>
  <div>
    <MainViewHeader/>
    <!--    <Upload/>-->
    <Edit/>
    <!--    <Submit/>-->
    <MainViewFooter :isDisabled="nextIsDisabled"/>
  </div>
</template>

<script>
  import MainViewHeader from "./mainViewComps/MainViewHeader";
  import MainViewFooter from "./mainViewComps/MainViewFooter";

  import Upload from "./mainViewComps/mainViewCenter/upload/Upload";
  import Edit from "./mainViewComps/mainViewCenter/edit/Edit";
  import Submit from "./mainViewComps/mainViewCenter/submit/Submit";

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
      Edit,
      Submit
    }
  }
</script>

<style scoped>

</style>
