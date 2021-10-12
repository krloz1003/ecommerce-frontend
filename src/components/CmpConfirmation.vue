<template>
<v-row justify="center">
	<v-dialog v-model="show" max-width="290">
		<v-card>
			<v-card-title class="text-h5">
				Confirmation
			</v-card-title>
			<v-card-text>
				{{ message }}
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="show = false">
					Cancel
				</v-btn>
				<v-btn color="green darken-1" text @click="confirmation()" >
					Continue
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-row>
</template>
<script>
export default {
	data: () => ({
		show: false,
		message: '',
		data: []		
	}),
	watch: {
		message: function(newVal){
			this.show = (newVal)? true : false;
		}
	},
	created: function() {
		this.$parent.$on('confirmationShow', this.confirmationShow);
	},
	methods: {
		confirmationShow(res){
			console.log(res);
			this.show = true;
			this.message = res.message;
			this.data 	= res;
		},
		confirmation(){
			this.show = false;
			this.message = '';
			this.$root.$emit("dialogConfirmation", this.data);
		}
	}
}
</script>