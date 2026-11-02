const image = (photo) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&q=85`

export const menuItems = [
  { id: 'espresso', name: 'Espresso', category: 'Coffee', description: 'A beautifully balanced, rich double shot.', price: 250, image: image('photo-1510707577719-ae7c14805e3a'), tag: 'House favourite' },
  { id: 'cappuccino', name: 'Cappuccino', category: 'Coffee', description: 'Velvety steamed milk and a cloud of foam.', price: 380, image: image('photo-1572442388796-11668a67e53d') },
  { id: 'latte', name: 'Vanilla Bean Latte', category: 'Coffee', description: 'Our smooth espresso with a hint of vanilla.', price: 420, image: image('photo-1461023058943-07fcbe16d735'), tag: 'Popular' },
  { id: 'americano', name: 'Americano', category: 'Coffee', description: 'A long black with a bold, clean finish.', price: 300, image: image('photo-1551030173-122aabc4489c') },
  { id: 'mocha', name: 'Dark Chocolate Mocha', category: 'Coffee', description: 'Espresso, dark chocolate and silky milk.', price: 460, image: image('photo-1578314675249-a6910f80cc4e') },
  { id: 'macchiato', name: 'Caramel Macchiato', category: 'Coffee', description: 'Espresso marked with milk and caramel.', price: 440, image: image('photo-1485808191679-5f86510681a2') },
  { id: 'black-tea', name: 'Kenyan Black Tea', category: 'Tea', description: 'Bright, full-bodied tea from the highlands.', price: 220, image: image('photo-1544787219-7f47ccb76574') },
  { id: 'green-tea', name: 'Sencha Green Tea', category: 'Tea', description: 'Light, grassy and gently refreshing.', price: 240, image: image('photo-1556679343-c7306c1976bc') },
  { id: 'chai-latte', name: 'Spiced Chai Latte', category: 'Tea', description: 'Black tea steeped with warming spices.', price: 360, image: image('photo-1571934811356-5cc061b6821f') },
  { id: 'herbal-tea', name: 'Garden Mint Tea', category: 'Tea', description: 'A soothing caffeine-free herbal infusion.', price: 250, image: image('photo-1564890369478-c89ca6d9cde9') },
  { id: 'iced-coffee', name: 'Cold Brew', category: 'Cold Drinks', description: 'Slow-steeped for 18 hours, served over ice.', price: 390, image: image('photo-1517701604599-bb29b565090c',) },
  { id: 'iced-latte', name: 'Iced Oat Latte', category: 'Cold Drinks', description: 'A double shot over ice with creamy oat milk.', price: 450, image: image('photo-1461023058943-07fcbe16d735') },
  { id: 'fresh-juice', name: 'Sunrise Fresh Juice', category: 'Cold Drinks', description: 'Freshly pressed orange, carrot and ginger.', price: 400, image: image('photo-1600271886742-f049cd451bba') },
  { id: 'smoothie', name: 'Mango Passion Smoothie', category: 'Cold Drinks', description: 'Tropical mango, passion fruit and yoghurt.', price: 480, image: image('photo-1505252585461-04db1eb84625') },
  { id: 'milkshake', name: 'Strawberry Milkshake', category: 'Cold Drinks', description: 'Real strawberries blended with vanilla.', price: 500, image: image('photo-1572490122747-3968b75cc699') },
  { id: 'croissant', name: 'Butter Croissant', category: 'Snacks', description: 'Flaky, golden layers baked fresh each morning.', price: 280, image: image('photo-1555507036-ab1f4038808a',), tag: 'Freshly baked' },
  { id: 'muffin', name: 'Blueberry Muffin', category: 'Snacks', description: 'A soft, buttery muffin bursting with berries.', price: 300, image: image('photo-1607958996333-41aef7caefaa') },
  { id: 'donut', name: 'Cinnamon Sugar Donut', category: 'Snacks', description: 'Pillowy and rolled in fragrant cinnamon sugar.', price: 220, image: image('photo-1551024506-0bccd828d307') },
  { id: 'cookies', name: 'Double Choc Cookies', category: 'Snacks', description: 'Chewy-centred cookies with dark chocolate.', price: 260, image: image('photo-1499636136210-6f4ee915583e') },
  { id: 'sandwich', name: 'Garden Veggie Sandwich', category: 'Snacks', description: 'Roasted vegetables, greens and herb cream cheese.', price: 520, image: image('photo-1528735602780-2552fd46c7af') },
  { id: 'chicken-sandwich', name: 'Grilled Chicken Sandwich', category: 'Main Meals', description: 'Herb-grilled chicken, avocado and house slaw.', price: 780, image: image('photo-1606755962773-d324e0a13086',) },
  { id: 'beef-burger', name: 'The Nairobi Beef Burger', category: 'Main Meals', description: 'Prime beef, aged cheddar and our secret relish.', price: 950, image: image('photo-1568901346375-23c9450c58cd',), tag: 'Signature' },
  { id: 'chicken-wrap', name: 'Peri Peri Chicken Wrap', category: 'Main Meals', description: 'Spiced chicken, crunchy slaw and tangy yoghurt.', price: 720, image: image('photo-1626700051175-6818013e1d4f') },
  { id: 'pancakes', name: 'Berry Stack Pancakes', category: 'Main Meals', description: 'Fluffy buttermilk pancakes, berries and maple.', price: 680, image: image('photo-1528207776546-365bb710ee93',), tag: 'Weekend pick' },
]

export const categories = ['All Items', 'Coffee', 'Tea', 'Cold Drinks', 'Snacks', 'Main Meals']
