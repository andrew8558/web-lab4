<template>
  <div class="container">
    <h1>Информация о кабинетах</h1>
    <div class="room-info">
      <p>Количество профильных кабинетов: {{ roomCounts.profile_rooms_count }}</p>
      <p>Количество базовых кабинетов: {{ roomCounts.basic_rooms_count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomCounts: {}
    };
  },
  created() {
    this.fetchRoomCounts();
  },
  methods: {
    async fetchRoomCounts() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/count-rooms-per-discipline-type/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch room counts');
        }
        this.roomCounts = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.room-info {
  margin-top: 20px;
}

p {
  margin-bottom: 10px;
}
</style>
