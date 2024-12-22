import { Either, left, right } from '@/lib/either'
import { openai } from '@/lib/openai'

export interface Completion {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface CompletionInput {
  completions: Completion[]
}

export interface CompletionResponse {
  role: 'assistant'
  content: string | null
}

type AiResponseFormated = Either<string | undefined, CompletionResponse>

export async function Completions({
  completions,
}: CompletionInput): Promise<AiResponseFormated> {
  try {
    const data = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: completions,
    })

    const selectResponse = data.choices[0].message

    if (selectResponse) {
      return right(selectResponse)
    } else {
      return left('No response from AI')
    }
  } catch (error) {
    console.error('Error fetching completion:', error)
    return left(`Error fetching completion: ${error}`)
  }
}
