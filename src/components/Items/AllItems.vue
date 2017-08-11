<template>
    <table>
        <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
        </thead>
        <tbody v-for="item in items" :key="item.id" @click="view(item)">
            <tr class='clickable-row'>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.amount }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        props: ['items'],
        data () {
            return {

            }
        },
        methods: {
            view (item) {

            }
        }
    }
</script>
<style lang="scss">
</style>