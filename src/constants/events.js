export const EVENTS = [
  {
    id: 'meeting_email',
    emoji: '📧',
    label: '開會不如寄信',
    color: '#E74C3C',
  },
  {
    id: 'unpaid_overtime',
    emoji: '🌙',
    label: '無薪加班',
    color: '#8E44AD',
  },
  {
    id: 'credit_stolen',
    emoji: '🏆',
    label: '功勞被搶走',
    color: '#F39C12',
  },
  {
    id: 'friday_urgent',
    emoji: '😱',
    label: '週五下班前急件',
    color: '#E74C3C',
  },
  {
    id: 'boss_contradiction',
    emoji: '🔄',
    label: '主管前後矛盾',
    color: '#2980B9',
  },
  {
    id: 'unpaid_extra_duty',
    emoji: '🎭',
    label: '被迫參加團康',
    color: '#27AE60',
  },
  {
    id: 'scope_creep',
    emoji: '📈',
    label: '需求一直改',
    color: '#F39C12',
  },
  {
    id: 'invisible_work',
    emoji: '👻',
    label: '做了沒人知道',
    color: '#7F8C8D',
  },
  {
    id: 'wellness_insult',
    emoji: '🧘',
    label: '壓力大？去冥想',
    color: '#16A085',
  },
  {
    id: 'blame_shift',
    emoji: '☝️',
    label: '黑鍋從天而降',
    color: '#C0392B',
  },
  { id: 'after_hours_message', emoji: '📱', label: '下班後被 Line', color: '#27AE60' },
  { id: 'salary_freeze', emoji: '💸', label: '薪水凍漲', color: '#F39C12' },
  { id: 'mandatory_training', emoji: '🖨️', label: '被迫上教育訓練', color: '#7F8C8D' },
  { id: 'endless_reports', emoji: '📋', label: '開不完的週報', color: '#2980B9' },
  { id: 'fake_hr_chat', emoji: '🤝', label: '假裝開心的 HR 面談', color: '#E91E63' },
]

export const EVENT_MAP = Object.fromEntries(EVENTS.map(e => [e.id, e]))
