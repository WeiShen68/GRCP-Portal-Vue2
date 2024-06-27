<template>
    <div class="pa-sm-2">
        <v-card class="px-3 mb-2 transparent" outlined>
            <div class="d-flex align-center py-4">
                <v-row align="center">
                    <v-col class="justify-start">
                        <span class="titles">Report</span> <span class="text-caption float-right">Generated On {{
                            datetime
                        }}</span>
                    </v-col>
                </v-row>
            </div>
        </v-card>
        <!-- mobile -->
        <div class="mt-md-2" v-if="mobile">
            <v-tabs v-model="currentItem" fixed-tabs color="deep-purple accent-4" class="localfix">
                <v-tab v-for="item in items" :key="item" :href="'#tab-' + item">
                    {{ item }}
                </v-tab>
                <v-menu v-if="more.length" bottom offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text class="align-self-center transparent" outlined v-bind="attrs" v-on="on" id="no-background-hover">
                            <v-icon>
                                mdi-menu-down
                            </v-icon>
                        </v-btn>
                    </template>

                    <v-list class="grey lighten-3">
                        <v-list-item v-for="item in more" :key="item" @click="addItem(item)" class="">
                            {{ item }}
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-tabs>
            <v-tabs-items v-model="currentItem">
                <v-tab-item v-for="item in items.concat(more)" :key="item" :value="'tab-' + item">
                    <v-container fluid>
                        <div v-if="item == 'Daily Sales By Outlet'">
                            <daily_sales_by_outlet></daily_sales_by_outlet>
                        </div>
                        <div v-if="item == 'Monthly Sales By Outlet'">
                            <monthly_sales_by_outlet></monthly_sales_by_outlet>
                        </div>
                        <div v-if="item == 'Daily Sales By Outlet & Scheme'">
                            <daily_sales_by_scheme></daily_sales_by_scheme>
                        </div>
                        <div v-if="item == 'Monthly Sales By Outlet & Scheme'">
                            <monthly_sales_by_scheme></monthly_sales_by_scheme>
                        </div>
                    </v-container>

                </v-tab-item>
            </v-tabs-items>
        </div>
        <!-- tablet and above -->
        <div class="mt-md-2" v-else>
            <v-tabs v-model="tabs" class="localfix" center-active color="deep-purple accent-4" grow>

                <v-tab v-for="item in items2" :key="item" :ripple="false"
                    :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }" class="tab_font">
                    {{ item }}
                </v-tab>
                <v-tab-item v-for="n in 4" :key="n" :transition="false" class="ml-md-2">
                    <v-container fluid>
                        <!-- tab 1 -->
                        <div v-if="n == 1" :class="{ 'mx-n3': $vuetify.breakpoint.smAndDown }">
                            <daily_sales_by_outlet></daily_sales_by_outlet>
                        </div>
                        <!-- tab 2 -->
                        <div v-if="n == 2" :class="{ 'mx-n3': $vuetify.breakpoint.smAndDown }">
                            <monthly_sales_by_outlet></monthly_sales_by_outlet>
                        </div>
                        <!-- tab 3 -->
                        <div v-if="n == 3" :class="{ 'mx-n3': $vuetify.breakpoint.smAndDown }">
                            <daily_sales_by_scheme></daily_sales_by_scheme>
                        </div>
                        <!-- tab 4 -->
                        <div v-if="n == 4" :class="{ 'mx-n3': $vuetify.breakpoint.smAndDown }">
                            <monthly_sales_by_scheme></monthly_sales_by_scheme>
                        </div>
                    </v-container>
                </v-tab-item>
            </v-tabs>

        </div>

    </div>
</template>

<script>

import daily_sales_by_outlet from './component/daily_sales_by_outlet.vue';
import monthly_sales_by_outlet from './component/monthly_sales_by_outlet.vue';
import daily_sales_by_scheme from './component/daily_sales_by_scheme.vue';
import monthly_sales_by_scheme from './component/monthly_sales_by_scheme.vue';

export default {

    components: {
        daily_sales_by_outlet,
        monthly_sales_by_outlet,
        daily_sales_by_scheme,
        monthly_sales_by_scheme,
    },

    data: () => ({
        datetime: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        tabs: null,
        currentItem: 'tab-Daily Sales By Outlet',
        items: ['Daily Sales By Outlet'],
        more: ['Monthly Sales By Outlet', 'Daily Sales By Outlet & Scheme', 'Monthly Sales By Outlet & Scheme'],

        items2: ['Daily Sales By Outlet', 'Monthly Sales By Outlet', 'Daily Sales By Outlet & Scheme', 'Monthly Sales By Outlet & Scheme']


    }),

    methods: {
        addItem(item) {
            const removed = this.items.splice(0, 1)
            this.items.push(
                ...this.more.splice(this.more.indexOf(item), 1),
            )
            this.more.push(...removed)
            this.$nextTick(() => { this.currentItem = 'tab-' + item })
        },
    },

    computed: {
        // mobile() {
        //     return this.$vuetify.breakpoint.smAndUp;
        // },

        mobile() {
            return this.$vuetify.breakpoint.xs;
        },
    },

}
</script>

<style scoped>
::v-deep .localfix .v-slide-group__prev.v-slide-group__prev--disabled,
::v-deep .localfix .v-slide-group__next.v-slide-group__next--disabled {
    display: none !important;
}

#no-background-hover::before {
    background-color: transparent !important;
}

.class1 {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}

.v-list-item{
    font-size: 0.825rem;
}
</style>