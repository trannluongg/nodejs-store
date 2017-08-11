<template>
    <tabs>
        <tab name="All items">
            <all-items :items="items"></all-items>
        </tab>
        <tab name="New item">
            <create-item :items="items" @add.prevent()="update"></create-item>
        </tab>
        <tab name="View item">
            Third tab content
        </tab>
    </tabs>
</template>
<script>
    export default {
        name: 'Items',
        data () {
            return {
                items: [{
                    id: 1,
                    name: 'name',
                    description: 'item',
                    amount: 1
                }]
            }
        },
        computed: {

        },
        methods: {
            update (item) {
                let onething = this.items.find(function(obj) {
                    return obj.name == item.name;
                })
                if(onething) {
                    onething.amount = this.number (onething.amount, item.amount)
                }
                else {
                    var id = this.items[this.items.length - 1].id
                    item.id = id+1
                    this.items.push(item)
                }
            },
            number (a, b) {
                return (a * 100 + b * 100)/100
            }
        }
    }
</script>
<style lang="scss"></style>