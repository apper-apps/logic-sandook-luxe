import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"
import { cn } from "@/utils/cn"

const SearchBar = ({ onSearch, placeholder = "Search products...", className }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-4"
      />
      <ApperIcon 
        name="Search" 
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" 
      />
    </form>
  )
}

export default SearchBar