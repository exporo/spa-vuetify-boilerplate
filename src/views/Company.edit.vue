<template>
    <v-container
            fluid
            fill-height
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col cols="12">
                <material-card
                        color="green"
                        title="Edit Profile"
                        text="Complete your profile"
                >
                    <v-form
                            ref="form"
                    >
                        <!-- form wrapper -->
                        <v-text-field
                                label="Company"
                                v-model="form.model.company_name"
                                :error-messages="form.errors.company_name"
                        />

                <v-btn v-on:click="onSave">Save</v-btn>
                    </v-form>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({

            form: {
                model:{

                },
                errors:{

                },
            },

        }),
        methods: {
            onSave () {
                console.log(this._data.form.model.company_name)
                this._data.form.errors.company_name = 'My Error2'
            },
        },
        mounted () {
            this.onSave()
        },
    }
</script>
