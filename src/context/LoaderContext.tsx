import { createContext, useContext, useState } from "react"

const LoaderContext = createContext<{
  hasLoaded: boolean
  setHasLoaded: (value: boolean) => void
}>({
  hasLoaded: false,
  setHasLoaded: () => {},
})

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <LoaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => useContext(LoaderContext)
