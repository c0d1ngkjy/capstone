<template>
  <q-page class="q-pa-xl">
    <div class="bg-white q-pa-md" style="border-radius: 12px;">
      <q-inner-loading :showing="loadingState" />
      <div class="flex items-start">
        <q-date class="col" style="border-radius: 12px;" flat v-model="selectedDate" landscape mask="YYYY/MM/DD"
          :locale="locale"/>

        <q-list class="col q-ml-md bg-blue-grey-1" style="border-radius: 12px;">
          <div v-if="todos[selectedDate]">
            <q-item class="q-py-md" v-for="(todo, index) in todos[selectedDate]" :key="index"
              style="border-radius: 12px;">

              <q-item-section>
                <q-item-label>{{ todo.title }}</q-item-label>
                <q-item-label caption>{{ todo.description }}</q-item-label>
              </q-item-section>

              <q-btn size="sm" unelevated @click="removeTodo(selectedDate, index, todo.calendar_id)" color="negative" icon="delete"
                class="float-right q-ma-md" style="border-radius: 8px; height: 27px" />
            </q-item>
          </div>
        </q-list>
      </div>

      <div class="q-mt-md">
        <div class="flex q-gutter-md bg-white " style="border-radius: 12px;">
          <q-input borderless v-model="newTodo.title" label="일정 (필수)" @keyup.enter="addTodo"
            class="col bg-blue-grey-1 q-px-md" style="border-radius: 12px;">
          </q-input>

          <q-input borderless v-model="newTodo.description" label="일정 설명" @keyup.enter="addTodo"
            class="col bg-blue-grey-1 q-px-md" style="border-radius: 12px;">
          </q-input>
          <q-btn unelevated color="primary" label="추가" @click="addTodo" class="q-ml-md q-px-xl"
            style="border-radius: 12px;" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref, watch } from 'vue';

defineOptions({
  name: 'CalendarPage'
})
const $q = useQuasar();
const userStore = useUserStore();
const loadingState = ref(false);

const selectedDate = ref('');
const newTodo = ref({});
const todos = ref({});

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC'
};

const locale = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};

const addTodo = async () => {
  if (!newTodo.value.title) {
    return;
  }
  loadingState.value = true;
  await api.post('calendar/create', {
    ...newTodo.value,
    clubId: userStore.currentClub.club_id,
    date: selectedDate.value
  }).then((res)=>{
    if(res.status==200){
      $q.notify({
        message:'일정 추가 완료',
        color: 'positive',
      })
    }
  });
  await fetchData();
  newTodo.value = {};
  loadingState.value = false;
};

async function fetchData() {
  loadingState.value = true;
  todos.value = {};
  await api.post('calendar/find', { clubId: userStore.currentClub.club_id })
    .then((res) => {
      todos.value = res.data.calendarData.reduce((acc, todo) => {
        acc[todo.date] = acc[todo.date] || [];
        acc[todo.date].push(todo);
        return acc;
      }, {});
    })
    .finally(() => {
      loadingState.value = false;
    });
}

onMounted(() => {
  fetchData();
  selectedDate.value = new Date().toLocaleDateString('ko-KR', options).replace(/\./g, '/').replace(/ /g, '').slice(0, -1);
});

const removeTodo = async (date, index, calId) => {
  await api.post('calendar/delete', { calendarId: calId })
  .then((res)=>{
    if(res.status == 200) {
      $q.notify({
        message: '일정 삭제 완료',
        color: 'negative'
      })
    }
  })
  await fetchData();
};

</script>

