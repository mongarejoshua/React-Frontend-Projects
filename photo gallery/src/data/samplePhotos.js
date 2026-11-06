const image = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const categories = ['All Photos', 'Nature', 'Architecture', 'People', 'Animals', 'Travel', 'Food', 'Technology', 'Lifestyle'];

export const samplePhotos = [
  { id: 's1', title: 'The quiet wild', category: 'Nature', date: 'May 18, 2025', description: 'First light falling across a quiet mountain valley.', src: image('photo-1470770841072-f978cf4d019e'), height: 'tall' },
  { id: 's2', title: 'Lines of the city', category: 'Architecture', date: 'May 12, 2025', description: 'A study of shape, shadow, and modern city architecture.', src: image('photo-1487958449943-2429e8be8625'), height: 'short' },
  { id: 's3', title: 'Sunday market', category: 'Food', date: 'May 8, 2025', description: 'Fresh seasonal fruit gathered at the neighborhood market.', src: image('photo-1490645935967-10de6ba17061'), height: 'medium' },
  { id: 's4', title: 'A softer light', category: 'People', date: 'May 2, 2025', description: 'A candid portrait in the warmth of late afternoon.', src: image('photo-1534528741775-53994a69daeb'), height: 'tall' },
  { id: 's5', title: 'Coastal blue', category: 'Travel', date: 'April 29, 2025', description: 'Deep blue water along a quiet Mediterranean coast.', src: image('photo-1519046904884-53103b34b206'), height: 'medium' },
  { id: 's6', title: 'Still life, in green', category: 'Lifestyle', date: 'April 23, 2025', description: 'An unhurried moment at home among plants and good light.', src: image('photo-1494438639946-1ebd1d20bf85'), height: 'short' },
  { id: 's7', title: 'Into the forest', category: 'Nature', date: 'April 19, 2025', description: 'Tall evergreens framed by the soft morning mist.', src: image('photo-1448375240586-882707db888b'), height: 'tall' },
  { id: 's8', title: 'Concrete poetry', category: 'Architecture', date: 'April 15, 2025', description: 'Quiet geometric forms in a sunlit architectural space.', src: image('photo-1511818966892-d7d671e672a2'), height: 'medium' },
  { id: 's9', title: 'Golden hour friend', category: 'Animals', date: 'April 11, 2025', description: 'A curious companion enjoying the last sun of the day.', src: image('photo-1552053831-71594a27632d'), height: 'short' },
  { id: 's10', title: 'The long way home', category: 'Travel', date: 'April 6, 2025', description: 'A winding mountain road disappearing into the hills.', src: image('photo-1464822759023-fed622ff2c3b'), height: 'tall' },
  { id: 's11', title: 'A cup and a book', category: 'Lifestyle', date: 'April 2, 2025', description: 'A slow morning with a favorite book and fresh coffee.', src: image('photo-1495474472287-4d71bcdd2085'), height: 'medium' },
  { id: 's12', title: 'Made by hand', category: 'Technology', date: 'March 28, 2025', description: 'Craft and technology meet on a creative studio desk.', src: image('photo-1518770660439-4636190af475'), height: 'short' },
  { id: 's13', title: 'Desert stillness', category: 'Nature', date: 'March 21, 2025', description: 'Sculpted dunes and long shadows at the edge of sunset.', src: image('photo-1509316785289-025f5b846b35'), height: 'tall' },
  { id: 's14', title: 'Corners of Lisbon', category: 'Travel', date: 'March 15, 2025', description: 'A colorful street caught between sun and shade.', src: image('photo-1519501025264-65ba15a82390'), height: 'medium' },
  { id: 's15', title: 'City in motion', category: 'People', date: 'March 9, 2025', description: 'Everyday city life, captured between destinations.', src: image('photo-1529156069898-49953e39b3ac'), height: 'short' },
  { id: 's16', title: 'On the table', category: 'Food', date: 'March 3, 2025', description: 'A colorful table of fresh ingredients, ready to share.', src: image('photo-1547592180-85f173990554'), height: 'medium' },
  { id: 's17', title: 'Small explorer', category: 'Animals', date: 'February 24, 2025', description: 'A little fox pausing to investigate the snow.', src: image('photo-1474511320723-9a56873867b5'), height: 'tall' },
  { id: 's18', title: 'After the rain', category: 'Architecture', date: 'February 18, 2025', description: 'A city street reflected in the gloss of fresh rain.', src: image('photo-1518005020951-eccb494ad742'), height: 'short' },
  { id: 's19', title: 'Open road', category: 'Travel', date: 'February 11, 2025', description: 'A road through the mountains and a sky full of possibility.', src: image('photo-1500530855697-b586d89ba3ee'), height: 'medium' },
  { id: 's20', title: 'Studio notes', category: 'Technology', date: 'February 4, 2025', description: 'Tools of the trade in a bright, well-loved studio.', src: image('photo-1498050108023-c5249f4df085'), height: 'short' },
];
