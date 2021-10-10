<template>
	<v-simple-table>
		<template v-slot:default>
			<thead>
				<tr>
					<th class="text-left">
						Product
					</th>
					<th class="text-left">
						Price
					</th>
					<th class="text-left">
						Amount
					</th>
					<th class="text-left">
						Total
					</th>			
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in rows" :key="row.id">
					<td>{{ row.name }}</td>
					<td>
						<div class="my-4 text-subtitle-1">
							{{ row.price | currency }}
						</div>
					</td>
					<td>						
						<v-btn small fab @click="$store.dispatch('increment', {id:row.id, rows: rows})">
							<v-icon>add</v-icon>
						</v-btn>
						<v-chip class="ma-2" large>
						{{ row.amount }}
						</v-chip>						
						<v-btn small fab @click="$store.dispatch('decrement', {id:row.id, rows: rows})">
							<v-icon>remove</v-icon>
						</v-btn>
					</td>
					<td>
						<div class="my-4 text-subtitle-1">
							{{ row.total | currency }}
						</div>				
					</td>
				</tr>
			</tbody>
		</template>
	</v-simple-table>
</template>
<script>
import {mapState} from 'vuex'
export default {
	data: () => ({
	}),
  computed:{
	...mapState({
		rows: state => state.shoping 
	})
  }	
}
</script>