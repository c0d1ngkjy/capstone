<template>
  <q-page class="q-pa-xl">
    <div class="bg-white q-px-md" style="border-radius: 12px;">
      <div class="row justify-between items-center q-py-md">
        <div class="text-h4 text-bold text-primary q-py-lg">{{ totalCost }} 원</div>
        <q-btn @click="addDueModal = true" color="primary" unelevated style="border-radius: 8px;">내역 추가하기</q-btn>
      </div>

      <q-list separator>
        <q-item class="text-bold text-grey">
          <q-item-section>
            <q-item-label>분류</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>내역</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>비고</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>날짜</q-item-label>
          </q-item-section>
          <q-item-section>금액</q-item-section>
          <q-item-section side>
            <q-item-label class="q-px-md">수정</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-for="(due, index) in sortedDueList" :key="index">
          <q-item-section>
            <q-item-label>
              {{ due.type == 'min' ? '지출' : '수입' }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{due.title}}</q-item-label>
          </q-item-section>
          <q-item-section>
            {{due.description || null}}
          </q-item-section>
          <q-item-section>
            {{ due.date }}
          </q-item-section>
          <q-item-section>{{due.cost}} 원</q-item-section>
          <q-item-section side>
            <q-btn unelevated color="negative" icon="delete" style="border-radius: 8px;" @click="deleteDue(index)" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="addDueModal">
        <q-card class="q-px-lg q-py-md" style="border-radius: 12px;">
          <div class="row items-center q-gutter-sm q-mb-md">
            <div>분류</div>
            <q-radio v-model="newDue.type" val="min" label="지출" />
            <q-radio v-model="newDue.type" val="plus" label="수입" />
          </div>
          <div v-if="errors.type" dense class="text-red">{{ errors.type }}</div>

          <div class="row items-center q-gutter-sm q-mb-md">
            <div>내역</div>
            <q-input v-model="newDue.title" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 1차 정기 회식" style="border-radius: 12px;" />
          </div>
          <div v-if="errors.title" dense class="text-red">{{ errors.title }}</div>

          <div class="row items-center q-gutter-sm q-mb-md">
            <div>비고</div>
            <q-input v-model="newDue.description" borderless class="bg-blue-grey-1 q-px-lg" placeholder="" style="border-radius: 12px;" />
          </div>

          <div class="row items-center q-gutter-sm q-mb-md">
            <div>날짜</div>
            <q-input v-model="newDue.date" borderless class="bg-blue-grey-1 q-px-lg" placeholder="" style="border-radius: 12px;" />
          </div>
          <div v-if="errors.date" dense class="text-red">{{ errors.date }}</div>

          <div class="row items-center q-gutter-sm q-mb-md">
            <div>금액</div>
            <q-input v-model="newDue.cost" borderless class="bg-blue-grey-1 q-px-lg" placeholder="Ex) 240000" style="border-radius: 12px;" />
          </div>
          <div v-if="errors.cost" dense class="text-red">{{ errors.cost }}</div>

          <q-btn unelevated style="border-radius: 12px;" color="primary" class="fit q-py-md" label="추가" @click="handleAddDue" />
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';

defineOptions({
  name: 'DuesPage'
})

const dueList = ref([])

const addDueModal = ref(false)
const newDue = ref({
  type: '',
  title: '',
  description: '',
  date: new Date().toLocaleDateString('ko-KR').slice(0,-1),
  cost: ''
})

const errors = ref({})

function validateDue(due) {
  const errors = {}
  if (!due.type) errors.type = '분류를 선택해주세요.'
  if (!due.title) errors.title = '내역을 입력해주세요.'
  if (!due.date) errors.date = '날짜를 입력해주세요.'
  if (!due.cost) errors.cost = '금액을 입력해주세요.'
  return errors
}

function handleAddDue() {
  const validationErrors = validateDue(newDue.value)
  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors
  } else {
    dueList.value.push(newDue.value)
    sortDueList()

    addDueModal.value = false
    newDue.value = {
      type: '',
      title: '',
      description: '',
      date: new Date().toLocaleDateString('ko-KR').slice(0,-1),
      cost: ''
    }
    errors.value = {}
  }
}

function deleteDue(index) {
  dueList.value.splice(index, 1)
  sortDueList()
}

function sortDueList() {
  dueList.value.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const totalCost = computed(() => {
  return dueList.value.reduce((acc, due) => {
    if (due.type === 'min') {
      return acc - parseFloat(due.cost)
    } else {
      return acc + parseFloat(due.cost)
    }
  }, 0)
})

const sortedDueList = computed(() => dueList.value.slice().sort((a, b) => new Date(b.date) - new Date(a.date)))
</script>
