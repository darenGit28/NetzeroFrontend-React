import React, { useMemo, useState } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { Icon } from '@iconify/react'
import useMobileMenu from '../../hooks/useMobileMenu'

export default function Navbar() {
  const { openMenu, closeMenu, opened } = useMobileMenu()

  const [isShadow, setIsShadow] = useState<boolean>(false)

  const icon = useMemo<string>(() => {
    if (opened) {
      return 'akar-icons:cross'
    } else {
      return 'material-symbols:menu-rounded'
    }
  }, [opened])

  const toggleMobileMenu = () => {
    if (opened) {
      return closeMenu()
    } else {
      return openMenu()
    }
  }

  const toggleShadow = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setIsShadow(true)
    } else if (scrolled <= 100) {
      setIsShadow(false)
    }
  }

  window.addEventListener('scroll', toggleShadow);

  return (
    <div className="sticky top-0 z-20">
      <div className={`relative ${isShadow && 'shadow-2xl'}`}>
        <div className="relative bg-white px-6 py-4 z-20">
          <div className="container mx-auto">
            <div className="flex justify-between items-center md:items-end">
              <img src="vite.svg" alt="Logo" className="w-12" />

              {/* For Desktop */}
              <div className="hidden lg:flex gap-1">
                <Button variant="text" className="text-primary hover:text-secondary font-bold">Page 1</Button>
                <Button variant="text" className="text-primary hover:text-secondary font-bold">Page 2</Button>
                <Button variant="text" className="text-primary hover:text-secondary font-bold">Page 3</Button>
                <Button variant="text" className="text-primary hover:text-secondary font-bold">Page 4</Button>
                <Button variant="text" className="text-primary hover:text-secondary font-bold">Page 5</Button>
              </div>

              {/* For Mobile */}
              <IconButton
                variant="text"
                className="text-3xl flex lg:hidden text-primary"
                onClick={toggleMobileMenu}
              >
                <Icon icon={icon} />
              </IconButton>

              <Button variant="text" className="hidden lg:flex bg-secondary hover:bg-secondary rounded-none text-white text-lg capitalize">
                How To Buy
              </Button>
            </div>
          </div>
        </div>

        {opened && (
          <div className={`absolute w-full flex lg:hidden flex-col items-center bg-primary ${isShadow && 'shadow-2xl'}`}>
            <Button variant="text" className="text-white text-sm">Page 1</Button>
            <Button variant="text" className="text-white text-sm">Page 2</Button>
            <Button variant="text" className="text-white text-sm">Page 3</Button>
            <Button variant="text" className="text-white text-sm">Page 4</Button>
            <Button variant="text" className="text-white text-sm">Page 5</Button>
          </div>
        )}
      </div>
    </div>
  )
}