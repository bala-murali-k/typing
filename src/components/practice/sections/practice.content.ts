export type Category = 'words' | 'code' | 'quotes' | 'devtools'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type CodeLang = 'JavaScript' | 'Python' | 'SQL'

export interface PracticeSnippet {
  id: string
  text: string
  label?: string
  lang?: CodeLang
}

export const PRACTICE_CONTENT: Record<Category, Record<Difficulty, PracticeSnippet[]>> = {
  words: {
    easy: [
      { id: 'w-e-1', text: 'the quick brown fox jumps over the lazy dog near the river bank on a cold winter morning' },
      { id: 'w-e-2', text: 'she sells sea shells by the sea shore while the sun slowly sets in the west' },
      { id: 'w-e-3', text: 'a big black bear sat on a large flat rock and looked at the clear blue sky above' },
      { id: 'w-e-4', text: 'how much wood could a wood chuck chuck if a wood chuck could chuck wood in the forest' },
    ],
    medium: [
      { id: 'w-m-1', text: 'software development is an iterative process requiring collaboration between designers, developers, and stakeholders to build products that serve real user needs.' },
      { id: 'w-m-2', text: 'debugging is the process of finding and fixing errors in source code, configuration, or unexpected behavior in a running system or application.' },
      { id: 'w-m-3', text: 'version control systems like git allow teams to track changes, collaborate on branches, and maintain a complete history of every modification made to a codebase.' },
      { id: 'w-m-4', text: 'good documentation reduces onboarding time, prevents knowledge silos, and ensures that critical decisions and system behaviors are clearly recorded for future developers.' },
    ],
    hard: [
      { id: 'w-h-1', text: 'the observer pattern defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automatically without tight coupling.' },
      { id: 'w-h-2', text: 'microservices architecture decomposes an application into small, independently deployable services that communicate over well-defined APIs, enabling scalability, fault isolation, and technology heterogeneity.' },
      { id: 'w-h-3', text: 'eventual consistency guarantees that, given enough time without new updates, all replicas of a distributed data store will converge to the same value, accepting temporary divergence for availability gains.' },
      { id: 'w-h-4', text: 'tail call optimization allows recursive functions to execute in constant stack space by reusing the current stack frame when the recursive call is the last operation performed in a function body.' },
    ],
  },

  code: {
    easy: [
      { id: 'c-e-1', lang: 'JavaScript', text: 'const greet = (name) => {\n  return `Hello, ${name}!`\n}\n\nconsole.log(greet("World"))' },
      { id: 'c-e-2', lang: 'Python',     text: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))' },
      { id: 'c-e-3', lang: 'JavaScript', text: 'const nums = [1, 2, 3, 4, 5]\nconst doubled = nums.map(n => n * 2)\nconsole.log(doubled)' },
      { id: 'c-e-4', lang: 'SQL',        text: 'SELECT id, name, email\nFROM users\nWHERE active = true\nORDER BY name ASC\nLIMIT 10;' },
    ],
    medium: [
      { id: 'c-m-1', lang: 'JavaScript', text: 'async function fetchUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`)\n    if (!res.ok) throw new Error("Not found")\n    return await res.json()\n  } catch (err) {\n    console.error(err)\n    return null\n  }\n}' },
      { id: 'c-m-2', lang: 'Python',     text: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1' },
      { id: 'c-m-3', lang: 'SQL',        text: 'SELECT u.name, COUNT(o.id) AS order_count, SUM(o.total) AS revenue\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE o.created_at >= NOW() - INTERVAL 30 DAY\nGROUP BY u.id, u.name\nHAVING order_count > 2\nORDER BY revenue DESC;' },
      { id: 'c-m-4', lang: 'JavaScript', text: 'function debounce(fn, delay) {\n  let timer\n  return function (...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn.apply(this, args), delay)\n  }\n}' },
    ],
    hard: [
      { id: 'c-h-1', lang: 'JavaScript', text: 'const createStore = (reducer, initialState) => {\n  let state = initialState\n  const listeners = new Set()\n  return {\n    getState: () => state,\n    dispatch: (action) => {\n      state = reducer(state, action)\n      listeners.forEach(l => l())\n    },\n    subscribe: (listener) => {\n      listeners.add(listener)\n      return () => listeners.delete(listener)\n    },\n  }\n}' },
      { id: 'c-h-2', lang: 'Python',     text: 'from functools import wraps\nfrom time import time\n\ndef rate_limit(max_calls, period):\n    def decorator(fn):\n        calls = []\n        @wraps(fn)\n        def wrapper(*args, **kwargs):\n            now = time()\n            calls[:] = [t for t in calls if now - t < period]\n            if len(calls) >= max_calls:\n                raise Exception("Rate limit exceeded")\n            calls.append(now)\n            return fn(*args, **kwargs)\n        return wrapper\n    return decorator' },
      { id: 'c-h-3', lang: 'SQL',        text: 'WITH ranked_sales AS (\n  SELECT\n    rep_id,\n    region,\n    SUM(amount) AS total,\n    RANK() OVER (PARTITION BY region ORDER BY SUM(amount) DESC) AS rnk\n  FROM sales\n  WHERE YEAR(sale_date) = 2024\n  GROUP BY rep_id, region\n)\nSELECT rep_id, region, total\nFROM ranked_sales\nWHERE rnk = 1;' },
      { id: 'c-h-4', lang: 'JavaScript', text: 'const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)\n\nconst sanitize = pipe(\n  (s) => s.trim(),\n  (s) => s.toLowerCase(),\n  (s) => s.replace(/[^a-z0-9\\s]/g, ""),\n  (s) => s.replace(/\\s+/g, "-"),\n)' },
    ],
  },

  quotes: {
    easy: [
      { id: 'q-e-1', text: 'Code is like humor. When you have to explain it, it is bad.' },
      { id: 'q-e-2', text: 'First, solve the problem. Then, write the code.' },
      { id: 'q-e-3', text: 'Make it work, make it right, make it fast.' },
      { id: 'q-e-4', text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' },
    ],
    medium: [
      { id: 'q-m-1', text: 'The most disastrous thing that you can ever learn is your first programming language. It shapes the way you think about programs for the rest of your life.' },
      { id: 'q-m-2', text: 'Programs must be written for people to read, and only incidentally for machines to execute. The computer is merciless in finding the bugs you leave behind.' },
      { id: 'q-m-3', text: 'The function of good software is to make the complex appear simple. The mark of a good interface is that it communicates its purpose without requiring a manual.' },
      { id: 'q-m-4', text: 'Simplicity is the soul of efficiency. The best code is no code at all. Every line you write is a line that can break, a line that must be tested, a line someone must read.' },
    ],
    hard: [
      { id: 'q-h-1', text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight. The goal is not volume; it is correctness, maintainability, and the elegant expression of intent.' },
      { id: 'q-h-2', text: 'As a rule, software systems do not work well until they have been used, and have failed repeatedly, in real applications. The act of deployment is also an act of learning you cannot replicate in isolation.' },
      { id: 'q-h-3', text: 'A distributed system is one in which the failure of a machine you have never heard of can render your own computer unusable. Partial failures, clock skew, and network partitions are the permanent reality of production.' },
      { id: 'q-h-4', text: 'The key insight is that correctness is not a property you bolt on at the end; it is a quality that must be woven into every decision from architecture to variable naming, from the first prototype to the final refactor.' },
    ],
  },

  devtools: {
    easy: [
      { id: 'd-e-1', text: 'git init\ngit add .\ngit commit -m "initial commit"\ngit push origin main' },
      { id: 'd-e-2', text: 'npm install\nnpm run dev\nnpm run build\nnpm run test' },
      { id: 'd-e-3', text: 'docker build -t myapp .\ndocker run -p 3000:3000 myapp\ndocker ps\ndocker stop myapp' },
      { id: 'd-e-4', text: 'ls -la\ncd /var/log\ncat app.log | grep ERROR\ntail -f app.log' },
    ],
    medium: [
      { id: 'd-m-1', text: 'git checkout -b feature/auth\ngit add src/auth.ts\ngit commit -m "feat: add JWT authentication middleware"\ngit push origin feature/auth\ngh pr create --title "Add auth" --body "Implements JWT middleware"' },
      { id: 'd-m-2', text: 'docker-compose up -d postgres redis\nexport DATABASE_URL=postgres://user:pass@localhost:5432/db\nnpx prisma migrate dev --name add_users\nnpx prisma generate\nnpm run dev' },
      { id: 'd-m-3', text: 'kubectl get pods -n production\nkubectl describe pod api-server-6d4f9b -n production\nkubectl logs api-server-6d4f9b -n production --tail=100\nkubectl rollout restart deployment/api-server -n production' },
      { id: 'd-m-4', text: 'grep -rn "TODO" ./src --include="*.ts"\nfind . -name "*.log" -mtime +7 -delete\nawk \'{print $1}\' access.log | sort | uniq -c | sort -rn | head -20' },
    ],
    hard: [
      { id: 'd-h-1', text: 'openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\\n  -keyout /etc/ssl/private/nginx.key \\\n  -out /etc/ssl/certs/nginx.crt \\\n  -subj "/C=US/ST=CA/L=SF/O=Org/CN=localhost"' },
      { id: 'd-h-2', text: 'git log --oneline --graph --decorate --all | head -30\ngit rebase -i HEAD~5\ngit reflog | grep "checkout:" | head -10\ngit bisect start HEAD v1.2.0 -- src/' },
      { id: 'd-h-3', text: 'curl -X POST https://api.example.com/v1/users \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"name":"Alice","role":"admin","notify":true}\' | jq \'.data.id\'' },
      { id: 'd-h-4', text: 'ssh -i ~/.ssh/prod.pem ubuntu@10.0.1.42 \\\n  "sudo systemctl stop api && cd /app && git pull && npm ci && npm run build && sudo systemctl start api"' },
    ],
  },
}

export const CATEGORY_META: Record<Category, { label: string; icon: string; description: string }> = {
  words:    { label: 'Sentences',  icon: 'article',        description: 'Common words and developer prose'       },
  code:     { label: 'Code',       icon: 'code',           description: 'Real functions in JS, Python, SQL'      },
  quotes:   { label: 'Quotes',     icon: 'format_quote',   description: 'Programming wisdom and aphorisms'       },
  devtools: { label: 'Dev Tools',  icon: 'terminal',       description: 'Git, Docker, kubectl, curl and more'    },
}

export const DIFFICULTY_META: Record<Difficulty, { label: string; color: string }> = {
  easy:   { label: 'Easy',   color: '#4ade80' },
  medium: { label: 'Medium', color: '#f59e0b' },
  hard:   { label: 'Hard',   color: '#f87171' },
}