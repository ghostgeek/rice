<template>
  <section id="page">
    <Page :total="100" show-total show-elevator></Page>
  </section>
</template>

<script>
    export default{
      data(){
        return{

        }
      }
    }
</script>
<style>
#page{
  text-align: center;
}
#page .ivu-page{
  display: inline-block;
}
</style>
