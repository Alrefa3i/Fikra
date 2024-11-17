import { useEffect, useState } from 'react'
import { useCart } from "react-use-cart";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { CategoriesData } from '../Home/Data'

const sortOptions = [
    { name: 'الأكثر شعبية', href: '#', current: true },
    { name: 'أفضل تقييم', href: '#', current: false },
    { name: 'الأحدث', href: '#', current: false },
    { name: 'السعر: من الأقل إلى الأعلى', href: '#', current: false },
    { name: 'السعر: من الأعلى إلى الأقل', href: '#', current: false },
]
const subCategories = CategoriesData
const filters = [
    {
        id: 'category',
        name: 'الفئة',
        options: [
            { value: 'new-arrivals', label: 'الدورات الجديدة', checked: false },
            { value: 'best', label: 'أفضل التقييمات', checked: false },
            { value: 'popular', label: 'الأكثر شعبية', checked: true },
            { value: 'organization', label: 'تنظيم الدورات', checked: false },
            { value: 'accessories', label: 'إكسسوارات التعليم', checked: false },
        ],
    },
]

const cards = [
    {
        id: 1,
        name: 'Devon Lane',
        role: 'Senior Developer',
        rating: 4.6,
        students: 854,
        image: 'path_to_devon_image',
    },
    {
        id: 2,
        name: 'Darrell Steward',
        role: 'Digital Product Designer',
        rating: 4.9,
        students: 451444,
        image: 'path_to_darrell_image',
    },
    {
        id: 3,
        name: 'Jane Cooper',
        role: 'UI/UX Designer',
        rating: 4.8,
        students: 435671,
        image: 'path_to_jane_image',
    },
    {
        id: 4,
        name: 'Albert Flores',
        role: 'Adobe Instructor',
        rating: 4.7,
        students: 511123,
        image: 'path_to_albert_image',
    },
    {
        id: 5,
        name: 'Kathryn Murphy',
        role: 'Lead Developer',
        rating: 4.2,
        students: 2711,
        image: 'path_to_kathryn_image',
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sessions() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        console.log(subCategories);

    }, []);
    const modal = (e) => {
        e.preventDefault();

        document.getElementById('my_modal_1').showModal();
    }

    return (
        <div className="bg-white dark:bg-gray-900" style={{ direction: "rtl" }}>

            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear" />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel className="relative mr-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-gray-800 py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">تصفية</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-ml-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400"
                                >
                                    <span className="sr-only">إغلاق القائمة</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="sr-only">الفئات</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900 dark:text-gray-100">
                                    {subCategories.map((category) => (
                                        <li key={category.id}>
                                            <a href={category.enTitle} className="block px-2 py-3">
                                                {category.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white dark:bg-gray-800 px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                                                <span className="mr-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="mr-3 min-w-0 flex-1 text-gray-500 dark:text-gray-300"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-700 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">وصل حديثاً</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                                        ترتيب
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-200"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-300',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 mr-5 p-2 text-gray-400 hover:text-gray-500 sm:mr-7">
                                <span className="sr-only">عرض الشبكة</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 mr-4 p-2 text-gray-400 hover:text-gray-500 sm:mr-6 lg:hidden"
                            >
                                <span className="sr-only">تصفية</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            المنتجات
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">الفئات</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {subCategories.map((category) => (
                                        <li key={category.id}>
                                            <a href={category.enTitle}>{category.title}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 dark:border-gray-700 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white dark:bg-gray-800 py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                                                <span className="mr-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="mr-3 text-sm text-gray-600 dark:text-gray-300">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <ul role="list" className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:gap-y-20 xl:grid-cols-3">
                                    {cards.map((card) => (
                                        <li key={card.name} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                                            <Link to={`/sections/${card.id}`}>
                                                <div className="relative bg-gray-200 dark:bg-gray-700 aspect-w-3 aspect-h-4">
                                                    <img
                                                        src={card.image}
                                                        alt=""
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-lg font-semibold dark:text-white">{card.name}</h3>
                                                    <p className="text-gray-500 dark:text-gray-400">{card.role}</p>
                                                    <div className="mt-2 flex justify-center space-x-4 text-sm text-gray-700 dark:text-gray-300">
                                                        <span>⭐ {card.rating}</span>
                                                        <span>{card.students.toLocaleString()} students</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}