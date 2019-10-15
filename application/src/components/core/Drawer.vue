<template>
    <v-navigation-drawer
            id="app-drawer"
            v-model="inputValue"
            :src="image"
            app
            color="grey darken-2"
            dark
            floating
            mobile-break-point="991"
            persistent
            width="260"
    >
        <template v-slot:img="attrs">
            <v-img
                    v-bind="attrs"
                    gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
            />
        </template>

        <v-list-item two-line>
            <v-list-item-avatar color="white">
                <v-img
                        src="https://cdn.vuetifyjs.com/images/logos/v.png"
                        height="34"
                        contain
                />
            </v-list-item-avatar>

            <v-list-item-title class="title">
                TEMPLATE.IO
            </v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3 mb-3"/>


        <v-list-item to="/">
            <v-list-item-title>Dashboard</v-list-item-title>
            <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
            </v-list-item-icon>
        </v-list-item>

        <v-list-group
                v-for="team in teams"
        >
            <template v-slot:activator>
                <v-list-item-title>{{ team.name }}</v-list-item-title>
            </template>

            <v-list-item :to="'/team/'+team.id" dense="true">
                <v-list-item-title>Edit {{ team.name }}</v-list-item-title>
                <v-list-item-icon>
                    <v-icon>mdi-settings</v-icon>
                </v-list-item-icon>
            </v-list-item>

            <v-list-group
                    no-action
                    sub-group
                    v-for="project in team.projects"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>{{ project.name }}</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item :to="'/project/'+project.id" dense="true">
                    <v-list-item-title>Edit {{ project.name }}</v-list-item-title>
                    <v-list-item-icon>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-icon>
                </v-list-item>

                <v-list-item
                        v-for="email in project.emails"
                        :key="email.name"
                        link
                        :to="'/email/'+email.id"
                >
                    <v-list-item-title v-text="email.name"></v-list-item-title>
                    <v-list-item-icon>
                        <v-icon>mdi-pencil-outline</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                <v-list-item to="/email">
                    <v-list-item-title>Add E-Mail</v-list-item-title>
                    <v-list-item-icon>
                        <v-icon>mdi-plus</v-icon>
                    </v-list-item-icon>
                </v-list-item>

            </v-list-group>
            <v-list-item to="/project" >
                <v-list-item-icon>
                    <v-icon></v-icon>
                </v-list-item-icon>
                <v-list-item-title>Add Project</v-list-item-title>
                <v-list-item-icon>
                    <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list-group>

        </v-list>

        <v-list-item to="/team" >
            <v-list-item-title>Add Team</v-list-item-title>
            <v-list-item-icon>
                <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
        </v-list-item>

    </v-navigation-drawer>
</template>

<script>
    // Utilities
    import {
        mapMutations,
        mapState,
    } from 'vuex'

    export default {
        props: {
            opened: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            teams: [
                {
                    name: 'Team 1',
                    id: 1,
                    projects: [
                        {
                            name: 'Auth',
                            id: 1,
                            emails: [{
                                name: 'Register',
                                id: 2,
                            }, {
                                name: 'PasswordReset',
                                id: 1,
                            }],
                        },
                        {
                            name: 'Checkout',
                            emails: [{
                                name: 'Abort',
                                id: 3,
                            }, {
                                name: 'Success',
                                id: 2,
                            }],
                        },
                    ],
                },
            ],
        }),

        computed: {
            ...mapState('app', ['image', 'color']),
            inputValue: {
                get () {
                    return this.$store.state.app.drawer
                },
                set (val) {
                    this.setDrawer(val)
                },
            },
        },

        methods: {
            ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
        },
    }
</script>
