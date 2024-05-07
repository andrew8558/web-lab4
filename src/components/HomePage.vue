<template>
  <div class="container">
    <h1>Домашняя страница</h1>
    <div class="sections">
      <router-link to="/teachers" class="section-link">Учителя</router-link>
      <router-link to="/classes" class="section-link">Классы</router-link>
      <router-link to="/add-teacher" class="section-link">Добавить учителя</router-link>
      <router-link to="/add-student" class="section-link">Добавить студента</router-link>
      <router-link to="/add-lesson" class="section-link">Добавить предмет в расписание</router-link>
      <router-link to="/rooms-info" class="section-link">Информация о кабинетах</router-link>
      <router-link to="/subjects-info" class="section-link">Информация о предметах</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.sections {
  display: flex;
  flex-direction: column;
}

.section-link {
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 18px;
  text-decoration: none;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.section-link:hover {
  background-color: #007bff;
  color: #fff;
}
</style>