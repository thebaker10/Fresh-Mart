export function SearchBar() {
    return (
        <div className="relative">
            <input type="search" id="search" className="block p-1.5 w-full px-16  z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border
             border-gray-300 focus:ring-green focus:border-green dark:bg-white dark:border-l-black  dark:border-gray-600 dark:placeholder-black dark:text-black
              dark:focus:border-green" placeholder="Search" required/>

                <button type="submit" className="absolute top-0 right-0 p-1.5 text-sm font-medium text-black bg-green rounded-r-lg border border-black hover:bg-green focus:ring-2 
                focus:outline-none focus:ring-green dark:bg-green dark:hover:bg-green dark:focus:ring-green">
                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" 
                    stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
        </div>
    )
}

