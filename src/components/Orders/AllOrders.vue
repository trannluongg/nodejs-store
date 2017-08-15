<template>
    <table>
        <thead>
        <tr>
            <th class="text-center">Order Id</th>
            <th class="text-center">Date</th>
            <th class="text-center">Price</th>
        </tr>
        </thead>
        <tbody v-for="(order, index) in orders" :key="order.id">
        <tr class="text-center">
            <td>{{ order.id }}</td>
            <td>{{ order.date | formatDate }}</td>
            <td>{{ order.price }}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    import moment from 'moment'
    export default {
        props: ['orders'],
        filters: {
            formatDate (date) {
                return moment(String(date)).format('MM/DD/YYYY')
            }
        }
    }
</script>
<style lang="scss"></style>