<template>

    <Form2 title="Hello world" text="fields" :fields="fields" :model="model" :errors="errors">
    </Form2>
</template>

<script>

    import Form2 from '../components/helper/Form2'
    import {RepositoryFactory} from '../repositories/RepositoryFactory'
    const UserRepository = RepositoryFactory.get('user');

    export default {
        comments: {
            Form2,
        },
        methods: {
            async submit() {
                await UserRepository.create(this.model);
            }
        },
        data: () => ({
            fields: [
                {
                    name: 'first_name',
                    label: 'First Name',
                    type: 'text',
                },
                {
                    name: 'last_name',
                    label: 'Last Name',
                    type: 'text',
                },
                {
                    name: 'text',
                    label: 'Last Name',
                    type: 'textarea',
                },
            ],
            model:{
                'first_name': 'Henrik',
                'last_name': 'Lippke',
            },
            errors:{
                'first_name': '',
                'last_name': '',
            }
        }),
    }
</script>
