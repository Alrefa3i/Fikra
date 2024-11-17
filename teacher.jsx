import React from 'react';

// Checkbox Component
const FilterCheckbox = ({ id, label, value, checked = false }) => (
    <div className="flex items-center">
        <input
            id={id}
            name="size[]"
            value={value}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            defaultChecked={checked}
        />
        <label htmlFor={id} className="ml-3 text-sm text-gray-600">
            {label}
        </label>
    </div>
);

// Header Component
const PageHeader = ({ title }) => (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
        {/* Additional header content (buttons, links) can go here */}
    </div>
);

// Filters Section
const FilterSection = () => (
    <section aria-labelledby="filter-heading" className="border-t border-gray-200 pt-6">
        <h2 id="filter-heading" className="sr-only">Filters</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Example of size filters */}
            <FilterCheckbox id="filter-size-1" label="12L" value="12l" />
            <FilterCheckbox id="filter-size-2" label="18L" value="18l" />
            <FilterCheckbox id="filter-size-3" label="20L" value="20l" />
            <FilterCheckbox id="filter-size-4" label="40L" value="40l" checked />
        </div>
    </section>
);

// Main Content Component
const MainContent = () => (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader title="New Arrivals" />
        <FilterSection />
        {/* Additional sections or components can go here */}
    </main>
);

// Parent Component
const TeacherForm = () => (
    <div>
        {/* Main content and layout */}
        <MainContent />
    </div>
);

export default TeacherForm;
