<template>

	<v-main fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-alert text prominent type="error" icon="report_problem" v-show="errors.message">
					{{ errors.message }}
				</v-alert>					
				<v-card class="elevation-12" :loading="loading">
					<template slot="progress">
						<v-progress-linear
							color="deep-purple"
							height="10"
							indeterminate
						></v-progress-linear>
					</template>					
					<v-toolbar dark color="primary">
						<v-toolbar-title>Login</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form ref="form" v-model="valid" lazy-validation>
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
						<v-btn color="primary" :loading="loading" @click.prevent="onSubmit()">Login</v-btn>
					</v-card-actions>
				</v-card>			
			</v-flex>
		</v-layout>
	</v-main>

</template>
<script>
import AuthService from "../services/AuthService";

export default {
	name: 'Login',
	data: () => ({
		show: false,
		valid: false,
		loading: false,
		form: {
			name: '',
			password: '',
		},
		rules: {
			name: [
				v => !!v || 'Username is required',
				//v => v.length >= 7 || 'The Username must be at least 7 characters.',
				//v => v.length <= 50 || 'The Username may not be greater than 50 characters.',
			],
			password: [
				v => !!v || 'Password is required',
				//v => v.length >= 8 || 'The Password must be at least 8 characters.',
			]			
		},
		errors: {}		
	}),	
	props: {
		source: String,
	},
	methods: {
		onSubmit(){					
			this.$refs.form.validate()
			if(!this.valid) return false;
			this.loading = true;
			
			AuthService.login(this.form)	
			.then(res => {
				this.form.name = ''
				this.form.password = ''
				this.$store.dispatch('getToken', res);
				this.$router.push('/');
				this.loading = false;
			})				
			.catch((res) => {
				this.errors = (res.response != undefined)? res.response.data : [];
				this.loading = false;
			});
		}
	}
};
</script>