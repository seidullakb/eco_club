# Advanced Functional Specification: Eco-Nexus Turkistan

## 1. Database Schema (Relational Structure)

### Table: `users` (Students)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `full_name` | String | Student's name |
| `class_id` | UUID | Foreign Key -> `classes.id` |
| `total_xp` | Integer | Cumulative points earned |
| `eco_level` | Integer | Calculated rank (1-10) |
| `bank_account` | String | Mock Freedom Bank IBAN |
| `created_at` | Timestamp | Account creation date |

### Table: `classes`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `name` | String | e.g., "9A", "10C" |
| `total_weight_kg`| Float | Total recycled weight |
| `milestone_count`| Integer | Number of 50kg milestones hit |

### Table: `transactions` (EcoQolday Sales)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `material_type` | Enum | "paper", "plastic", "metal" |
| `weight_kg` | Float | Measured weight |
| `revenue_kzt` | Float | weight * rate (e.g., 50 KZT) |
| `logged_by` | UUID | Admin User ID |
| `timestamp` | Timestamp | Date of pickup |

### Table: `rewards`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Recipient |
| `reward_type` | String | "Cashback", "Badge", "Bonus" |
| `amount_kzt` | Float | Value if applicable |
| `status` | Enum | "pending", "processed" |

---

## 2. Profit Logic Algorithm (JavaScript)

```javascript
/**
 * Calculates revenue and distributes impact points.
 * Triggers milestones for classes.
 */
function processRecyclingEntry(weight, materialType, classId, participatingStudents) {
  const RATES = { paper: 50, plastic: 30, metal: 100 };
  const XP_PER_KG = 10;
  
  // 1. Calculate Revenue
  const revenue = weight * (RATES[materialType] || 0);
  
  // 2. Distribute XP to Students
  const xpPerStudent = (weight * XP_PER_KG) / participatingStudents.length;
  
  // 3. Update Class Progress & Check Milestones
  const milestoneThreshold = 50;
  const isMilestoneHit = (currentClassWeight % milestoneThreshold) + weight >= milestoneThreshold;

  return {
    revenue,
    xpPerStudent,
    triggerMilestone: isMilestoneHit,
    notification: isMilestoneHit ? `Class ${classId} hit a 50kg milestone!` : null
  };
}
```

---

## 3. API Integration: Freedom Bank Mock

**Endpoint:** `POST /api/v1/freedom-bank/payout`
**Payload:**
```json
{
  "student_iban": "KZ1234567890",
  "amount": 500,
  "reason": "Eco-Level 3 Milestone Bonus",
  "api_key": "SECURE_MOCK_KEY"
}
```
**Logic:** When `user.eco_level` increments, the backend triggers this payout. The student receives a push notification: *"Freedom Bank just deposited 500 KZT for your Eco-achievements!"*

---

## 4. Gemini Vision AI Prompt

**System Instruction:**
> "You are an expert waste sorting assistant for a school in Kazakhstan. Analyze the provided image. Identify if the primary object is 'Paper', 'Plastic', or 'Non-Recyclable'. 
> 
> Return JSON format:
> {
>   'material': 'paper' | 'plastic' | 'other',
>   'confidence': 0.0-1.0,
>   'reasoning': 'Short explanation in English',
>   'is_clean': boolean (is the item contaminated with food?)
> }"

---

## 5. Frontend Interactions (Framer Motion)

1.  **Recycle Button Pop-up:**
    *   `whileTap={{ scale: 0.95 }}`
    *   `initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}`
2.  **Rolling Numbers (Money Counter):**
    *   Use `useSpring` and `useTransform` to animate a numeric value from 0 to the target revenue.
3.  **Screen Transitions:**
    *   `AnimatePresence` with `x: 100%` to `x: 0` for a native mobile "push" feel.

---

## 6. Scalability Roadmap

1.  **Phase 1 (Current):** Local state + Mock JSON for MVP testing.
2.  **Phase 2 (Enterprise):** Integrate **Firebase Auth** for secure student logins and **Cloud Functions** to handle the Freedom Bank API triggers asynchronously.
