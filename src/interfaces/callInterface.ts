interface ICall {
  id: number
  created_at: string
  direction: 'inbound' | 'outbound'
  from: string
  to: string
  via: string
  duration: number
  is_archived: boolean
  call_type: 'answered' | 'missed'
}

export default ICall
