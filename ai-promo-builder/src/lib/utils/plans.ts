import { Plan, PLAN_LIMITS } from '@/types'

export function canPublishVariant(plan: Plan, currentCount: number): boolean {
  const limit = PLAN_LIMITS[plan].maxPublishedPages
  return currentCount < limit
}

export function getRemainingPublishQuota(plan: Plan, currentCount: number): number {
  const limit = PLAN_LIMITS[plan].maxPublishedPages
  return Math.max(0, limit - currentCount)
}

export function getPlanDisplayName(plan: Plan): string {
  switch (plan) {
    case Plan.FREE:
      return 'Free'
    case Plan.PAID:
      return 'Paid'
    case Plan.ULTIMATE:
      return 'Ultimate'
    default:
      return 'Unknown'
  }
}

export function getPlanPrice(plan: Plan): number {
  switch (plan) {
    case Plan.FREE:
      return 0
    case Plan.PAID:
      return 29
    case Plan.ULTIMATE:
      return 99
    default:
      return 0
  }
}

export function getNextPlan(currentPlan: Plan): Plan | null {
  switch (currentPlan) {
    case Plan.FREE:
      return Plan.PAID
    case Plan.PAID:
      return Plan.ULTIMATE
    case Plan.ULTIMATE:
      return null
    default:
      return null
  }
}