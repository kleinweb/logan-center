import {useSiteMenusContext} from '@/contexts/SiteMenus'
import {MenuItem, MenuItemsFragment} from '@/gql/graphql'
import {unsafeFlatListToHierarchical} from '@/lib/menus'
import {ChevronDown, MenuIcon} from 'lucide-react'

// type MenuItemProps = {
//   menuData: MenuItemsFragment
// }

function NavigationMenuItems({menuData}) {
  return menuData.map((parent: MenuItem) =>
    parent?.childItems?.nodes ? (
      <div key={parent.id}>
        <span className="link">
          <span className="link__label">{parent.label}</span>
          <ChevronDown />
        </span>
        <div className="dropdown">
          {parent.childItems.nodes.map((child: MenuItem) => (
            <a key={child.id} href={child.path ?? '#'}>
              {child.label}
            </a>
          ))}
        </div>
      </div>
    ) : (
      <a key={parent.id} href={parent.path ?? '#'} className="link">
        {parent.label}
      </a>
    ),
  )
}

export default function NavigationMenu({menuItems}) {
  const {headerMenu} = useSiteMenusContext()
  // const [opened, {toggle}] = useDisclosure(false)

  // Convert flat list to hierarchical list.
  const menuData = unsafeFlatListToHierarchical(
    headerMenu?.menuItems?.nodes ?? [],
  )
  return (
    <>
      <div className="links">
        <NavigationMenuItems menuData={menuData} />
      </div>
      <div>
        <MenuIcon />
        {/* <Burger opened={opened} onClick={toggle} className={classes.burger} /> */}
      </div>
      {/* // <Drawer
    //   onClose={toggle}
    //   opened={opened}
    //   padding="md"
    //   position="right"
    //   title="Menu"
    // >
    //   {menuItems}
    // </Drawer> */}
    </>
  )
}
