<template>
    <div>
        <el-button type="primary" @click="getacticle">123</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pp: "name=admin"
        }
    },
    methods: {
        getacticle (){
            this.$store.dispatch('test/postActicle', this.pp).then(res => {
                console.log(res)
            });
        }
    }
}
</script>