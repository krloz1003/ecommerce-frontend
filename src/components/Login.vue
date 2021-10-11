<template>

	<v-main fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12">
					<v-toolbar dark color="primary">
						<v-toolbar-title>Login</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form v-model="valid">
							<v-text-field
								prepend-icon="person"
								name="login"
								label="Username"
								type="text"
								v-model="form.name"
								:rules="rules.name"
							></v-text-field>
							<v-text-field
								id="password"
								prepend-icon="lock"
								name="password"
								label="Password"
								type="password"
								v-model="form.password"
								:rules="rules.password"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" @click.prevent="onSubmit()">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-main>

</template>
<script>
export default {
	name: 'Login',
	data: () => ({
		show: false,
		valid: false,
		form: {
			name: '',
			password: '',
		},
		rules: {
			name: [
				v => !!v || 'Username is required',
				v => v.length >= 7 || 'The Username must be at least 7 characters.',
				v => v.length <= 50 || 'The Username may not be greater than 50 characters.',
			],
			password: [
				v => !!v || 'Password is required',
				v => v.length >= 8 || 'The Password must be at least 8 characters.',
			]			
		}		
	}),	
	props: {
		source: String,
	},
	methods: {
		onSubmit(){
			console.log('Preprando los datos');
		}
	}
};
</script>