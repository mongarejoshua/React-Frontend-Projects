import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'nutrition-label-maker-projects'
const CURRENT_KEY = 'nutrition-label-maker-current'

const nutrientMeta = {
  calories: { label: 'Calories', unit: 'kcal', dv: null },
  totalFat: { label: 'Total Fat', unit: 'g', dv: 78 },
  saturatedFat: { label: 'Saturated Fat', unit: 'g', dv: 20 },
  transFat: { label: 'Trans Fat', unit: 'g', dv: 2 },
  cholesterol: { label: 'Cholesterol', unit: 'mg', dv: 300 },
  sodium: { label: 'Sodium', unit: 'mg', dv: 2300 },
  totalCarbs: { label: 'Total Carbohydrates', unit: 'g', dv: 275 },
  fiber: { label: 'Dietary Fiber', unit: 'g', dv: 28 },
  totalSugars: { label: 'Total Sugars', unit: 'g', dv: null },
  addedSugars: { label: 'Added Sugars', unit: 'g', dv: 50 },
  protein: { label: 'Protein', unit: 'g', dv: 50 },
  vitaminD: { label: 'Vitamin D', unit: 'mcg', dv: 20 },
  calcium: { label: 'Calcium', unit: 'mg', dv: 1300 },
  iron: { label: 'Iron', unit: 'mg', dv: 18 },
  potassium: { label: 'Potassium', unit: 'mg', dv: 4700 },
}

const allergenOptions = [
  'Milk',
  'Eggs',
  'Peanuts',
  'Tree nuts',
  'Soy',
  'Wheat',
  'Fish',
  'Shellfish',
  'Sesame',
]

const referenceStandards = {
  'FDA (US)': {
    calories: null,
    totalFat: 78,
    saturatedFat: 20,
    transFat: 2,
    cholesterol: 300,
    sodium: 2300,
    totalCarbs: 275,
    fiber: 28,
    totalSugars: null,
    addedSugars: 50,
    protein: 50,
    vitaminD: 20,
    calcium: 1300,
    iron: 18,
    potassium: 4700,
  },
  'EU / UK reference': {
    calories: null,
    totalFat: 78,
    saturatedFat: 20,
    transFat: null,
    cholesterol: 300,
    sodium: 2400,
    totalCarbs: 260,
    fiber: 30,
    totalSugars: null,
    addedSugars: null,
    protein: 50,
    vitaminD: 5,
    calcium: 800,
    iron: 14,
    potassium: 2000,
  },
}

const templateCatalog = [
  {
    id: 'bread',
    name: 'Bread',
    category: 'Bakery',
    productName: 'Whole Grain Bread',
    brandName: 'Fresh Harvest',
    servingSize: 40,
    servingSizeUnit: 'g',
    servingsPerContainer: 12,
    netWeight: 480,
    manufacturer: 'Illustrative sample baker',
    countryOfOrigin: 'United States',
    nutrients: {
      calories: 160,
      totalFat: 2.5,
      saturatedFat: 0.5,
      transFat: 0,
      cholesterol: 0,
      sodium: 220,
      totalCarbs: 29,
      fiber: 5,
      totalSugars: 3,
      addedSugars: 1,
      protein: 7,
      vitaminD: 0,
      calcium: 20,
      iron: 1.8,
      potassium: 110,
    },
    ingredients: ['Whole wheat flour', 'Water', 'Yeast', 'Sunflower oil', 'Sea salt'],
    allergens: ['Wheat'],
    caution: 'Sample data for concept design only.',
  },
  {
    id: 'milk',
    name: 'Milk',
    category: 'Dairy',
    productName: 'Whole Milk',
    brandName: 'Country Cream',
    servingSize: 240,
    servingSizeUnit: 'ml',
    servingsPerContainer: 2,
    netWeight: 480,
    manufacturer: 'Illustrative dairy co.',
    countryOfOrigin: 'United States',
    nutrients: {
      calories: 150,
      totalFat: 8,
      saturatedFat: 5,
      transFat: 0,
      cholesterol: 24,
      sodium: 120,
      totalCarbs: 12,
      fiber: 0,
      totalSugars: 12,
      addedSugars: 0,
      protein: 8,
      vitaminD: 2.5,
      calcium: 300,
      iron: 0,
      potassium: 370,
    },
    ingredients: ['Grade A milk', 'Vitamin D3', 'Vitamin A'],
    allergens: ['Milk'],
    caution: 'Sample values only.',
  },
  {
    id: 'yogurt',
    name: 'Yogurt',
    category: 'Dairy',
    productName: 'Greek Yogurt',
    brandName: 'Pure Cultures',
    servingSize: 170,
    servingSizeUnit: 'g',
    servingsPerContainer: 4,
    netWeight: 680,
    manufacturer: 'Illustrative dairy group',
    countryOfOrigin: 'Canada',
    nutrients: {
      calories: 100,
      totalFat: 0.5,
      saturatedFat: 0.3,
      transFat: 0,
      cholesterol: 5,
      sodium: 50,
      totalCarbs: 6,
      fiber: 0,
      totalSugars: 5,
      addedSugars: 0,
      protein: 17,
      vitaminD: 0,
      calcium: 180,
      iron: 0.1,
      potassium: 200,
    },
    ingredients: ['Skim milk', 'Live cultures', 'Pectin', 'Vanilla bean'],
    allergens: ['Milk'],
    caution: 'Illustrative sample only.',
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    category: 'Beverage',
    productName: 'Fresh Orange Juice',
    brandName: 'Sun Bright',
    servingSize: 240,
    servingSizeUnit: 'ml',
    servingsPerContainer: 2,
    netWeight: 480,
    manufacturer: 'Illustrative beverage ltd.',
    countryOfOrigin: 'Brazil',
    nutrients: {
      calories: 110,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      cholesterol: 0,
      sodium: 0,
      totalCarbs: 26,
      fiber: 0.5,
      totalSugars: 21,
      addedSugars: 0,
      protein: 2,
      vitaminD: 0,
      calcium: 27,
      iron: 0.3,
      potassium: 450,
    },
    ingredients: ['Orange juice', 'Natural flavors', 'Vitamin C'],
    allergens: [],
    caution: 'Sample values only.',
  },
  {
    id: 'potato-chips',
    name: 'Potato Chips',
    category: 'Snacks',
    productName: 'Sea Salt Potato Chips',
    brandName: 'Golden Crunch',
    servingSize: 28,
    servingSizeUnit: 'g',
    servingsPerContainer: 6,
    netWeight: 168,
    manufacturer: 'Illustrative snack maker',
    countryOfOrigin: 'United States',
    nutrients: {
      calories: 150,
      totalFat: 10,
      saturatedFat: 1.5,
      transFat: 0,
      cholesterol: 0,
      sodium: 170,
      totalCarbs: 15,
      fiber: 1.5,
      totalSugars: 0,
      addedSugars: 0,
      protein: 2,
      vitaminD: 0,
      calcium: 10,
      iron: 0.4,
      potassium: 370,
    },
    ingredients: ['Potatoes', 'Sunflower oil', 'Sea salt'],
    allergens: [],
    caution: 'Illustrative sample values.',
  },
  {
    id: 'breakfast-cereal',
    name: 'Breakfast Cereal',
    category: 'Breakfast',
    productName: 'Whole Grain Crunch',
    brandName: 'Morning Harvest',
    servingSize: 30,
    servingSizeUnit: 'g',
    servingsPerContainer: 12,
    netWeight: 360,
    manufacturer: 'Illustrative cereal ltd.',
    countryOfOrigin: 'United Kingdom',
    nutrients: {
      calories: 120,
      totalFat: 2,
      saturatedFat: 0.5,
      transFat: 0,
      cholesterol: 0,
      sodium: 130,
      totalCarbs: 25,
      fiber: 4,
      totalSugars: 8,
      addedSugars: 5,
      protein: 3,
      vitaminD: 2,
      calcium: 120,
      iron: 4.5,
      potassium: 100,
    },
    ingredients: ['Whole grain wheat', 'Rice flour', 'Dried fruit', 'Vitamin blend'],
    allergens: ['Wheat', 'Soy'],
    caution: 'Sample values for concepting only.',
  },
]

function getSafeNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function getNewId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `label-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function createDefaultProject() {
  return {
    id: getNewId(),
    name: 'New Nutrition Label',
    productName: 'Sunrise Citrus Smoothie',
    brandName: 'Harvest Home',
    category: 'Beverage',
    servingSize: 240,
    servingSizeUnit: 'ml',
    servingsPerContainer: 2,
    netWeight: 480,
    manufacturer: 'Illustrative manufacturer',
    countryOfOrigin: 'United States',
    referenceStandard: 'FDA (US)',
    labelFormat: 'standard',
    ingredients: ['Orange juice', 'Banana puree', 'Coconut water', 'Natural flavor'],
    allergens: ['None declared'],
    customizations: {
      width: 420,
      height: 'auto',
      fontSize: 15,
      fontFamily: 'Inter, sans-serif',
      textAlign: 'left',
      borderThickness: 3,
      backgroundColor: '#ffffff',
      textColor: '#1d1d1f',
      lineSpacing: 1.2,
      compactLayout: false,
      showIngredients: true,
      showAllergens: true,
    },
    nutrients: {
      calories: 110,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      cholesterol: 0,
      sodium: 10,
      totalCarbs: 26,
      fiber: 2,
      totalSugars: 18,
      addedSugars: 0,
      protein: 1,
      vitaminD: 0,
      calcium: 20,
      iron: 0.3,
      potassium: 360,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function getDailyValue(key, value, standardName) {
  const standard = referenceStandards[standardName] || referenceStandards['FDA (US)']
  const reference = standard[key]

  if (!reference || !Number.isFinite(Number(value)) || Number(value) <= 0) {
    return 0
  }

  return Math.min(100, (Number(value) / reference) * 100)
}

function getNutrientValue(project, key) {
  return getSafeNumber(project.nutrients?.[key])
}

function getPerServingSummary(project) {
  const serving = getSafeNumber(project.servingSize) || 1
  const servingsPerContainer = getSafeNumber(project.servingsPerContainer) || 1

  const nutrientKeys = Object.keys(nutrientMeta)
  const summary = {}

  nutrientKeys.forEach((key) => {
    const amount = getNutrientValue(project, key)
    const per100 = serving > 0 ? (amount / serving) * 100 : 0
    const total = amount * servingsPerContainer

    summary[key] = {
      amount,
      per100,
      total,
      dv: getDailyValue(key, amount, project.referenceStandard),
    }
  })

  const caloriesFromMacros =
    (getNutrientValue(project, 'totalFat') || 0) * 9 +
    (getNutrientValue(project, 'totalCarbs') || 0) * 4 +
    (getNutrientValue(project, 'protein') || 0) * 4

  return { summary, caloriesFromMacros, serving, servingsPerContainer }
}

function App() {
  const [project, setProject] = useState(() => {
    const saved = localStorage.getItem(CURRENT_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        return createDefaultProject()
      }
    }
    return createDefaultProject()
  })

  const [savedProjects, setSavedProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    try {
      return JSON.parse(saved)
    } catch (error) {
      return []
    }
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [activeNav, setActiveNav] = useState('create')

  useEffect(() => {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(project))
  }, [project])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProjects))
  }, [savedProjects])

  const nutritionSummary = useMemo(() => getPerServingSummary(project), [project])

  const categoryOptions = ['All', ...new Set(savedProjects.map((item) => item.category).filter(Boolean))]

  const filteredSavedProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return savedProjects.filter((item) => {
      const matchesSearch =
        !term ||
        item.productName?.toLowerCase().includes(term) ||
        item.brandName?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term)

      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [savedProjects, searchTerm, categoryFilter])

  function updateProject(nextState) {
    setProject((previous) => ({
      ...previous,
      ...nextState,
      updatedAt: new Date().toISOString(),
    }))
  }

  function handleFieldChange(fieldName, value) {
    setProject((previous) => ({
      ...previous,
      [fieldName]: value,
      updatedAt: new Date().toISOString(),
    }))
  }

  function handleNutrientChange(key, value) {
    setProject((previous) => ({
      ...previous,
      nutrients: {
        ...previous.nutrients,
        [key]: Number(value) || 0,
      },
      updatedAt: new Date().toISOString(),
    }))
  }

  function handleIngredientChange(index, value) {
    setProject((previous) => {
      const nextIngredients = [...previous.ingredients]
      nextIngredients[index] = value
      return { ...previous, ingredients: nextIngredients, updatedAt: new Date().toISOString() }
    })
  }

  function addIngredient() {
    setProject((previous) => ({
      ...previous,
      ingredients: [...previous.ingredients, ''],
      updatedAt: new Date().toISOString(),
    }))
  }

  function removeIngredient(index) {
    setProject((previous) => {
      const trimmed = previous.ingredients.filter((_, itemIndex) => itemIndex !== index)
      return { ...previous, ingredients: trimmed, updatedAt: new Date().toISOString() }
    })
  }

  function moveIngredient(index, direction) {
    setProject((previous) => {
      const list = [...previous.ingredients]
      const target = index + direction
      if (target < 0 || target >= list.length) return previous
      ;[list[index], list[target]] = [list[target], list[index]]
      return { ...previous, ingredients: list, updatedAt: new Date().toISOString() }
    })
  }

  function toggleAllergen(allergen) {
    setProject((previous) => {
      const allergens = previous.allergens.includes(allergen)
        ? previous.allergens.filter((item) => item !== allergen)
        : [...previous.allergens, allergen]
      return { ...previous, allergens, updatedAt: new Date().toISOString() }
    })
  }

  function applyTemplate(selectedTemplate) {
    const templateData = {
      ...createDefaultProject(),
      ...selectedTemplate,
      id: getNewId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ingredients: [...(selectedTemplate.ingredients || [])],
      allergens: [...(selectedTemplate.allergens || [])],
      customizations: {
        width: 420,
        height: 'auto',
        fontSize: 15,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'left',
        borderThickness: 3,
        backgroundColor: '#ffffff',
        textColor: '#1d1d1f',
        lineSpacing: 1.2,
        compactLayout: false,
        showIngredients: true,
        showAllergens: true,
      },
    }

    setProject(templateData)
    setActiveNav('create')
  }

  function saveCurrentProject() {
    const entry = {
      ...project,
      id: project.id || getNewId(),
      updatedAt: new Date().toISOString(),
      createdAt: project.createdAt || new Date().toISOString(),
    }

    const existingIndex = savedProjects.findIndex((item) => item.id === entry.id)

    if (existingIndex >= 0) {
      const updated = [...savedProjects]
      updated[existingIndex] = entry
      setSavedProjects(updated)
    } else {
      setSavedProjects((previous) => [entry, ...previous])
    }
  }

  function duplicateProject(id) {
    const label = savedProjects.find((item) => item.id === id)
    if (!label) return

    const copy = {
      ...label,
      id: getNewId(),
      name: `${label.name || 'Copy'} (copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setSavedProjects((previous) => [copy, ...previous])
  }

  function deleteProject(id) {
    setSavedProjects((previous) => previous.filter((item) => item.id !== id))
  }

  function loadProject(projectEntry) {
    setProject({
      ...projectEntry,
      customizations: {
        ...createDefaultProject().customizations,
        ...(projectEntry.customizations || {}),
      },
    })
    setActiveNav('create')
  }

  function exportSvg() {
    const svgContent = createSvgMarkup(project)
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(project.productName || 'nutrition-label').toLowerCase().replace(/\s+/g, '-')}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(project.productName || 'nutrition-label').toLowerCase().replace(/\s+/g, '-')}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const totalSavedLabels = savedProjects.length
  const recentProject = savedProjects[0] || project

  return (
    <div className="app-shell">
      <nav className="topbar navbar navbar-expand-lg">
        <div className="container-fluid topbar-inner">
          <div className="brand-wrap">
            <div className="brand-mark">
              <i className="bi bi-egg-fried"></i>
            </div>
            <div>
              <span className="brand-name">NUTRITION LABEL MAKER</span>
            </div>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {['Dashboard', 'Create Label', 'My Labels', 'Templates', 'About', 'Help'].map((item) => {
                const key = item.toLowerCase().replace(/\s+/g, '-')
                return (
                  <li className="nav-item" key={item}>
                    <button
                      type="button"
                      className={`nav-link ${activeNav === key ? 'active' : ''}`}
                      onClick={() => setActiveNav(key)}
                    >
                      {item}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>

      <main className="page-shell">
        <section className="hero-banner">
          <div className="hero-copy">
            <span className="eyebrow">Nutrition design studio</span>
            <h1>Create Professional Nutrition Labels in Minutes.</h1>
            <p>
              Design, customize, calculate, and export nutrition facts labels for your food and beverage
              products.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={() => setActiveNav('create')}>
                Create New Label
              </button>
              <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => setActiveNav('templates')}>
                Explore Templates
              </button>
            </div>
            <div className="feature-row">
              <div>
                <i className="bi bi-check2-circle"></i>
                Real-time label preview
              </div>
              <div>
                <i className="bi bi-check2-circle"></i>
                Daily value calculator
              </div>
              <div>
                <i className="bi bi-check2-circle"></i>
                Export ready assets
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="mini-label-card">
              <NutritionLabel project={project} format={project.labelFormat} compactPreview />
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="stat-card">
            <span className="stat-label">Total labels created</span>
            <strong>{savedProjects.length + 1}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Saved labels</span>
            <strong>{totalSavedLabels}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Recently edited</span>
            <strong>{recentProject?.productName || 'Current label'}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Available templates</span>
            <strong>{templateCatalog.length}</strong>
          </div>
        </section>

        <section className="studio-grid" id="create-label">
          <div className="panel editor-panel">
            <div className="panel-header">
              <h2>Label Setup</h2>
              <button type="button" className="btn btn-success btn-sm" onClick={saveCurrentProject}>
                Save label
              </button>
            </div>

            <div className="form-panel">
              <div className="section-block">
                <h3>Product information</h3>
                <div className="form-grid">
                  <label>
                    Product name
                    <input value={project.productName} onChange={(e) => handleFieldChange('productName', e.target.value)} />
                  </label>
                  <label>
                    Brand name
                    <input value={project.brandName} onChange={(e) => handleFieldChange('brandName', e.target.value)} />
                  </label>
                  <label>
                    Product category
                    <input value={project.category} onChange={(e) => handleFieldChange('category', e.target.value)} />
                  </label>
                  <label>
                    Serving size
                    <input
                      type="number"
                      value={project.servingSize}
                      onChange={(e) => handleFieldChange('servingSize', Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Unit
                    <select value={project.servingSizeUnit} onChange={(e) => handleFieldChange('servingSizeUnit', e.target.value)}>
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                      <option value="pieces">pieces</option>
                      <option value="cups">cups</option>
                    </select>
                  </label>
                  <label>
                    Servings per container
                    <input
                      type="number"
                      value={project.servingsPerContainer}
                      onChange={(e) => handleFieldChange('servingsPerContainer', Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Net weight
                    <input
                      type="number"
                      value={project.netWeight}
                      onChange={(e) => handleFieldChange('netWeight', Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Manufacturer
                    <input value={project.manufacturer} onChange={(e) => handleFieldChange('manufacturer', e.target.value)} />
                  </label>
                  <label>
                    Country of origin
                    <input value={project.countryOfOrigin} onChange={(e) => handleFieldChange('countryOfOrigin', e.target.value)} />
                  </label>
                </div>
              </div>

              <div className="section-block">
                <h3>Nutritional information</h3>
                <div className="nutrient-grid">
                  {Object.entries(nutrientMeta).map(([key, meta]) => (
                    <label key={key}>
                      <span>{meta.label}</span>
                      <div className="inline-input">
                        <input
                          type="number"
                          step="0.1"
                          value={project.nutrients[key] ?? 0}
                          onChange={(e) => handleNutrientChange(key, e.target.value)}
                        />
                        <small>{meta.unit}</small>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="section-block daily-value-box">
                <h3>Daily Value calculator</h3>
                <div className="standard-row">
                  <label>
                    Reference standard
                    <select value={project.referenceStandard} onChange={(e) => handleFieldChange('referenceStandard', e.target.value)}>
                      {Object.keys(referenceStandards).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <table className="dv-table">
                  <thead>
                    <tr>
                      <th>Nutrient</th>
                      <th>Amount</th>
                      <th>% DV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(nutrientMeta).map(([key, meta]) => {
                      const value = project.nutrients[key] ?? 0
                      const percent = getDailyValue(key, value, project.referenceStandard)
                      if (!meta.dv && key !== 'totalSugars') return null
                      return (
                        <tr key={key}>
                          <td>{meta.label}</td>
                          <td>
                            {value} {meta.unit}
                          </td>
                          <td>{Math.round(percent)}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p className="standard-note">Reference standard in use: {project.referenceStandard}</p>
              </div>

              <div className="section-block">
                <h3>Ingredients & allergens</h3>
                <div className="ingredient-stack">
                  {project.ingredients.map((ingredient, index) => (
                    <div className="ingredient-row" key={`${ingredient}-${index}`}>
                      <input value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} />
                      <button type="button" className="icon-btn" onClick={() => moveIngredient(index, -1)}>
                        <i className="bi bi-arrow-up"></i>
                      </button>
                      <button type="button" className="icon-btn" onClick={() => moveIngredient(index, 1)}>
                        <i className="bi bi-arrow-down"></i>
                      </button>
                      <button type="button" className="icon-btn danger" onClick={() => removeIngredient(index)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-light add-btn" onClick={addIngredient}>
                    Add ingredient
                  </button>
                </div>

                <div className="allergen-box">
                  <label className="allergen-header">Allergen declaration</label>
                  <div className="allergen-grid">
                    {allergenOptions.map((allergen) => (
                      <label key={allergen} className="check-item">
                        <input
                          type="checkbox"
                          checked={project.allergens.includes(allergen)}
                          onChange={() => toggleAllergen(allergen)}
                        />
                        <span>{allergen}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    value={project.allergens.join(', ')}
                    onChange={(e) => handleFieldChange('allergens', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
                    placeholder="Separate allergens with commas"
                  />
                </div>
              </div>

              <div className="section-block customization-box">
                <h3>Label customization</h3>
                <div className="custom-grid">
                  <label>
                    Label width
                    <input
                      type="number"
                      value={project.customizations.width}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, width: Number(e.target.value) || 300 },
                        })
                      }
                    />
                  </label>
                  <label>
                    Font size
                    <input
                      type="number"
                      value={project.customizations.fontSize}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, fontSize: Number(e.target.value) || 14 },
                        })
                      }
                    />
                  </label>
                  <label>
                    Border thickness
                    <input
                      type="number"
                      value={project.customizations.borderThickness}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, borderThickness: Number(e.target.value) || 2 },
                        })
                      }
                    />
                  </label>
                  <label>
                    Line spacing
                    <input
                      type="number"
                      step="0.1"
                      value={project.customizations.lineSpacing}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, lineSpacing: Number(e.target.value) || 1 },
                        })
                      }
                    />
                  </label>
                  <label>
                    Font family
                    <select
                      value={project.customizations.fontFamily}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, fontFamily: e.target.value },
                        })
                      }
                    >
                      <option value="Inter, sans-serif">Inter</option>
                      <option value="Arial, sans-serif">Arial</option>
                      <option value="Georgia, serif">Georgia</option>
                    </select>
                  </label>
                  <label>
                    Text alignment
                    <select
                      value={project.customizations.textAlign}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, textAlign: e.target.value },
                        })
                      }
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </label>
                  <label>
                    Background colour
                    <input
                      type="color"
                      value={project.customizations.backgroundColor}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, backgroundColor: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label>
                    Text colour
                    <input
                      type="color"
                      value={project.customizations.textColor}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, textColor: e.target.value },
                        })
                      }
                    />
                  </label>
                </div>
                <div className="switch-row">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={project.customizations.compactLayout}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, compactLayout: e.target.checked },
                        })
                      }
                    />
                    Compact layout
                  </label>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={project.customizations.showIngredients}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, showIngredients: e.target.checked },
                        })
                      }
                    />
                    Show ingredients
                  </label>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={project.customizations.showAllergens}
                      onChange={(e) =>
                        updateProject({
                          customizations: { ...project.customizations, showAllergens: e.target.checked },
                        })
                      }
                    />
                    Show allergens
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="panel preview-panel">
            <div className="panel-header preview-header">
              <h2>Live preview</h2>
              <div className="preview-actions">
                <select value={project.labelFormat} onChange={(e) => handleFieldChange('labelFormat', e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="compact">Compact</option>
                  <option value="vertical">Vertical</option>
                  <option value="simplified">Simplified</option>
                </select>
                <button type="button" className="btn btn-secondary btn-sm" onClick={exportSvg}>
                  Export SVG
                </button>
                <button type="button" className="btn btn-outline-success btn-sm" onClick={exportJson}>
                  Export JSON
                </button>
              </div>
            </div>

            <NutritionLabel project={project} format={project.labelFormat} />
          </div>
        </section>

        <section className="resource-grid" id="templates">
          <div className="panel templates-panel">
            <div className="panel-header">
              <h2>Product templates</h2>
            </div>
            <div className="template-grid">
              {templateCatalog.map((template) => (
                <button type="button" key={template.id} className="template-card" onClick={() => applyTemplate(template)}>
                  <div className="template-topline">{template.category}</div>
                  <h3>{template.name}</h3>
                  <p>{template.productName}</p>
                  <span className="template-note">Illustrative sample values only</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel labels-panel" id="my-labels">
            <div className="panel-header">
              <h2>My labels</h2>
            </div>

            <div className="saved-controls">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search saved labels"
              />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                {categoryOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="saved-list">
              {filteredSavedProjects.length ? (
                filteredSavedProjects.map((label) => (
                  <div className="saved-item" key={label.id}>
                    <div>
                      <strong>{label.productName || label.name}</strong>
                      <span>{label.brandName}</span>
                      <small>
                        {label.category} • {new Date(label.updatedAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="saved-actions">
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => loadProject(label)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => duplicateProject(label.id)}>
                        Duplicate
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteProject(label.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">No saved labels match your search.</div>
              )}
            </div>
          </div>
        </section>

        <section className="info-banner" id="about">
          <div className="panel small-panel">
            <h3>About</h3>
            <p>
              The label maker is designed for quick concept development and professional nutrition label mockups.
              Sample values are illustrative and should not be treated as verified nutrition data.
            </p>
          </div>
          <div className="panel small-panel" id="help">
            <h3>Help</h3>
            <p>
              Change serving size, adjust nutrient values, compare daily value percentages, and export your design as
              SVG or JSON for downstream workflows.
            </p>
          </div>
        </section>

        <section className="calculator-summary">
          <div className="panel summary-panel">
            <h3>Nutrition calculator</h3>
            <div className="summary-grid">
              <div>
                <span>Per serving</span>
                <strong>{nutritionSummary.serving}</strong>
              </div>
              <div>
                <span>Per 100</span>
                <strong>{((nutritionSummary.summary.totalCarbs?.amount / (nutritionSummary.serving || 1)) * 100).toFixed(1)}g</strong>
              </div>
              <div>
                <span>Product total</span>
                <strong>{nutritionSummary.summary.totalCarbs?.total.toFixed(1)}g</strong>
              </div>
              <div>
                <span>Calories from macros</span>
                <strong>{nutritionSummary.caloriesFromMacros.toFixed(0)} kcal</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function NutritionLabel({ project, format, compactPreview = false }) {
  const custom = project.customizations || {}
  const labelStyle = {
    width: compactPreview ? '100%' : `${custom.width || 420}px`,
    fontFamily: custom.fontFamily || 'Inter, sans-serif',
    fontSize: `${custom.fontSize || 15}px`,
    backgroundColor: custom.backgroundColor || '#ffffff',
    color: custom.textColor || '#1d1d1f',
    borderWidth: `${custom.borderThickness || 3}px`,
    textAlign: custom.textAlign || 'left',
    lineHeight: Number(custom.lineSpacing) || 1.2,
    ...(!compactPreview ? { minHeight: custom.height === 'auto' ? 'auto' : `${custom.height}px` } : {}),
  }

  const nutrientRows = Object.entries(nutrientMeta).map(([key, meta]) => {
    const value = getNutrientValue(project, key)
    return {
      key,
      label: meta.label,
      value,
      unit: meta.unit,
      dv: getDailyValue(key, value, project.referenceStandard),
    }
  })

  const ingredientList = project.ingredients?.filter((item) => item && item.trim().length > 0) || []
  const allergenList = Array.isArray(project.allergens) ? project.allergens.filter(Boolean) : []

  return (
    <div className={`nutrition-label format-${format || 'standard'} ${custom.compactLayout ? 'compact' : ''}`} style={labelStyle}>
      <div className="label-body">
        <div className="label-header">
          <div className="label-brand">{project.brandName || 'Brand Name'}</div>
          <h3>{project.productName || 'Product Name'}</h3>
          <div className="label-meta">
            <span>Serving size {project.servingSize || 0} {project.servingSizeUnit || 'g'}</span>
            <span>Servings per container {project.servingsPerContainer || 1}</span>
          </div>
        </div>

        <div className="rules strong"></div>
        <div className="row amount-row">
          <span>Calories</span>
          <strong>{project.nutrients?.calories || 0}</strong>
        </div>
        <div className="rules thick"></div>

        <div className="nutrient-list">
          {nutrientRows
            .filter((row) => row.key !== 'totalSugars' || format !== 'simplified')
            .map((row) => (
              <div key={row.key} className="nutrient-row">
                <span>{row.label}</span>
                <div className="nutrient-values">
                  <strong>
                    {row.value} {row.unit}
                  </strong>
                  {row.dv > 0 ? <span>{Math.round(row.dv)}%</span> : <span>—</span>}
                </div>
              </div>
            ))}
        </div>

        <div className="rules thick"></div>

        {custom.showIngredients && ingredientList.length > 0 && (
          <div className="ingredients-block">
            <div className="label-subheader">Ingredients</div>
            <div>{ingredientList.join(', ')}</div>
          </div>
        )}

        {custom.showAllergens && allergenList.length > 0 && (
          <div className="ingredients-block allergen-block">
            <div className="label-subheader">Contains</div>
            <div>{allergenList.join(', ')}</div>
          </div>
        )}

        <div className="label-footer">
          <div>Net wt. {project.netWeight || 0} g</div>
          <div>{project.manufacturer || 'Manufacturer'}</div>
          <div>{project.countryOfOrigin || 'Country of origin'}</div>
          <div className="standard-pill">{project.referenceStandard || 'FDA (US)'}</div>
        </div>
      </div>
    </div>
  )
}

function createSvgMarkup(project) {
  const valueRows = Object.entries(nutrientMeta)
    .map(([key, meta]) => {
      const value = project.nutrients?.[key] ?? 0
      return `
        <text x="18" y="${140 + Object.keys(nutrientMeta).indexOf(key) * 14}">
          <tspan font-weight="700">${meta.label}</tspan>
          <tspan dx="8">${value} ${meta.unit}</tspan>
          <tspan dx="14">${Math.round(getDailyValue(key, value, project.referenceStandard))}% DV</tspan>
        </text>`
    })
    .join('')

  const allergenText = Array.isArray(project.allergens) ? project.allergens.join(', ') : ''

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="420" height="760" viewBox="0 0 420 760">
    <rect width="420" height="760" fill="${project.customizations?.backgroundColor || '#fff'}" stroke="#1d1d1f" stroke-width="3"/>
    <text x="20" y="36" font-size="14" font-family="Arial" fill="#1d1d1f" font-weight="700">${project.brandName || 'Brand Name'}</text>
    <text x="20" y="62" font-size="22" font-family="Arial" fill="#1d1d1f" font-weight="800">${project.productName || 'Product Name'}</text>
    <text x="20" y="88" font-size="12" font-family="Arial" fill="#1d1d1f">Serving size ${project.servingSize || 0} ${project.servingSizeUnit || 'g'} • Servings per container ${project.servingsPerContainer || 1}</text>
    <line x1="18" y1="100" x2="402" y2="100" stroke="#1d1d1f" stroke-width="3"/>
    <text x="20" y="124" font-size="15" font-family="Arial" fill="#1d1d1f" font-weight="700">Calories</text>
    <text x="360" y="124" font-size="15" font-family="Arial" fill="#1d1d1f" font-weight="700">${project.nutrients?.calories || 0}</text>
    <line x1="18" y1="132" x2="402" y2="132" stroke="#1d1d1f" stroke-width="3"/>
    ${valueRows}
    <line x1="18" y1="420" x2="402" y2="420" stroke="#1d1d1f" stroke-width="3"/>
    <text x="20" y="448" font-size="12" font-family="Arial" fill="#1d1d1f">Ingredients: ${project.ingredients?.join(', ') || ''}</text>
    <text x="20" y="472" font-size="12" font-family="Arial" fill="#1d1d1f">Contains: ${allergenText}</text>
    <text x="20" y="500" font-size="11" font-family="Arial" fill="#1d1d1f">Net wt. ${project.netWeight || 0} g</text>
    <text x="20" y="520" font-size="11" font-family="Arial" fill="#1d1d1f">${project.manufacturer || 'Manufacturer'}</text>
    <text x="20" y="540" font-size="11" font-family="Arial" fill="#1d1d1f">${project.countryOfOrigin || 'Country of origin'}</text>
  </svg>
  `
}

export default App
