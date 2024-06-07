<template>
  <q-page class="q-pa-xl">
    <div class="bg-white q-pa-md" style="border-radius: 12px;">
      <div class="flex items-start">
        <q-date class="col" style="border-radius: 12px;" flat v-model="selectedDate" landscape mask="YYYY/MM/DD"
          :locale="locale" @input="updateSelectedDate" />

        <q-list class="col q-ml-md bg-blue-grey-1" style="border-radius: 12px;">
          <div v-if="todos[selectedDate]">
            <q-item class="q-py-md" v-for="(todo, index) in todos[selectedDate]" :key="index"
              style="border-radius: 12px;">

              <q-item-section>
                <q-item-label>{{ todo.title }}</q-item-label>
                <q-item-label caption>{{ todo.description }}</q-item-label>
              </q-item-section>

              <q-btn size="sm" unelevated @click="removeTodo(selectedDate, index)" color="negative" icon="delete"
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
            style="border-radius: 8px;" />
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
const $q = useQuasar()
const userStore = useUserStore();

const selectedDate = ref('');
const newTodo = ref({});
const todos = ref({});

watch(todos.value, () => console.log(todos.value))

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC'
};
onMounted(() => {
  selectedDate.value = new Date().toLocaleDateString('ko-KR', options).replace(/\./g, '/').replace(/ /g, '').slice(0, -1);
  if (!todos.value[selectedDate.value]) {
    todos.value[selectedDate.value] = [];
  }
})

const locale = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};

const updateSelectedDate = () => {
  if (!todos.value[selectedDate.value]) {
    todos.value[selectedDate.value] = [];
  }
};

const addTodo = () => {
  if (!newTodo.value.title) {
    // $q.notify({
    //   message: '일정을 입력해주세요',
    //   color: 'red'
    // })
    return
  }
  const data = {
    ...newTodo.value,
    clubId: userStore.currentClub.club_id,
    date: selectedDate.value
  }
  console.log(data)
  api.post('calendar/create', data).then((res)=>{
    console.log(res)
  })

  if (!todos.value[selectedDate.value]) {
    todos.value[selectedDate.value] = [];
  }

  todos.value[selectedDate.value].push(newTodo.value);

  newTodo.value = {};
};

const removeTodo = (date, index) => {
  todos.value[date].splice(index, 1);
};
</script>
