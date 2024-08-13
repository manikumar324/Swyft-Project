import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'; 
import InitialScreen from './components/InitialScreen';
import NavbarMobile from './components/NavbarMobile';
import SignupModal from "./components/signupModal";
import ProtectedRoute from './components/ProtectedRoute';
import lazyloader from './assets/loader.json';
import Lottie from 'react-lottie';


// Lazy load components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Categories = lazy(() => import('./components/categories'));
const Cart = lazy(() => import('./components/Cart'));
const Vegetables = lazy(() => import('./components/Vegetables'));
const IceCream = lazy(() => import('./components/IceCream'));
const TeaCoffee = lazy(() => import('./components/TeaCoffee'));
const DrinkJuice = lazy(() => import('./components/DrinkJuice'));
const Dairy = lazy(() => import('./components/Dairy'));
const MeatFish = lazy(() => import('./components/MeatFish'));
const Sweet = lazy(() => import('./components/Sweet'));
const Chips = lazy(() => import('./components/Chips'));
const BiscuitCookie = lazy(() => import('./components/BiscuitCookie'));
const Frozen = lazy(() => import('./components/Frozen'));
const RiceOil = lazy(() => import('./components/RiceOil'));
const DryFruits = lazy(() => import('./components/DryFruits'));
const Breakfast = lazy(() => import('./components/Breakfast'));
const PackagedFood = lazy(() => import('./components/PackagedFood'));

const App = () => {
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [vegetables, setVegetables] = useState([]);
  const [ice, setIce] = useState([]);
  const [tea, setTea] = useState([]);
  const [drink, setDrink] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [meat, setMeat] = useState([]);
  const [sweet, setSweet] = useState([]);
  const [chips, setChips] = useState([]);
  const [biscuit, setBiscuit] = useState([]);
  const [frozen, setFrozen] = useState([]);
  const [rice,setRice] = useState([]);
  const [dry,setDry] = useState([]);
  const [breakfast,setBreakfast] = useState([]);
  const [packaged,setPackaged] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://swyft-server.onrender.com/items");
        console.log("Fetched data:", response.data); 
        setVegetables(response.data);
        setIce(response.data);
        setTea(response.data);
        setDrink(response.data);
        setDairy(response.data);
        setMeat(response.data);
        setSweet(response.data);
        setChips(response.data);
        setBiscuit(response.data);
        setFrozen(response.data);
        setRice(response.data);
        setDry(response.data);
        setBreakfast(response.data);
        setPackaged(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const filterVegetables = vegetables.filter((item) => item.category === 'fruit' || item.category === 'vegetable');
  const filterIceCream = ice.filter((item) => item.category === 'ice');
  const filterTeaCoffe = tea.filter((item) => item.category === 'tea' || item.category === 'coffee');
  const filterDrinkJuice = drink.filter((item) => item.category === 'drink' || item.category === 'juice');
  const filterMeatFish = meat.filter((item) => item.category === 'meat' || item.category === 'fish');
  const filterBiscuitCookie = biscuit.filter((item) => item.category === 'biscuit' || item.category === 'cookie');
  const filterDairy = dairy.filter((item) => item.category === 'dairy');
  const filterSweet = sweet.filter((item) => item.category === 'sweet');
  const filterChips = chips.filter((item) => item.category === 'chips');
  const filterFrozen = frozen.filter((item) => item.category === 'frozen');
  const filterRice = rice.filter((item) => item.category === "atta");
  const filterDryFruits = dry.filter((item) => item.category === "dryfruits");
  const filterBreakfast = breakfast.filter((item) => item.category === "breakfast");
  const filterPackaged = packaged.filter((item) => item.category === "packets");

  const Loader = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: lazyloader,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  
    return (
      <div className="loader-container flex justify-center items-center h-[100vh]">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  };

  return (
    <div>
      {showInitialScreen ? (
        <InitialScreen />
      ) : (
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/login" element={<SignupModal />} />
              <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
              <Route path="/categories" element={<ProtectedRoute element={Categories} />} />
              <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
              <Route path="/categories/grocery&kitchen/vegetables-fruits" element={<ProtectedRoute element={() => <Vegetables items={filterVegetables} />} />} />
              <Route path="/categories/snacks&drinks/ice-creams" element={<ProtectedRoute element={() => <IceCream items={filterIceCream} />} />} />
              <Route path="/categories/snacks&drinks/tea-coffee" element={<ProtectedRoute element={() => <TeaCoffee items={filterTeaCoffe} />} />} />
              <Route path="/categories/snacks&drinks/cooldrinks-juices" element={<ProtectedRoute element={() => <DrinkJuice items={filterDrinkJuice} />} />} />
              <Route path="/categories/grocery&kitchen/dairy-bread-eggs" element={<ProtectedRoute element={() => <Dairy items={filterDairy} />} />} />
              <Route path="/categories/grocery&kitchen/meat-fish&more" element={<ProtectedRoute element={() => <MeatFish items={filterMeatFish} />} />} />
              <Route path="/categories/snacks&drinks/sweet-items" element={<ProtectedRoute element={() => <Sweet items={filterSweet} />} />} />
              <Route path="/categories/snacks&drinks/chips-munchies&more" element={<ProtectedRoute element={() => <Chips items={filterChips} />} />} />
              <Route path="/categories/snacks&drinks/biscuits-cookies" element={<ProtectedRoute element={() => <BiscuitCookie items={filterBiscuitCookie} />} />} />
              <Route path="/categories/snacks&drinks/frozen-items" element={<ProtectedRoute element={() => <Frozen items={filterFrozen} />} />} />
              <Route path='/categories/grocery&kitchen/atta-rice-dal&more' element={<ProtectedRoute element={()=><RiceOil items={filterRice}/>} />} />
              <Route path='/categories/grocery&kitchen/dry-fruits' element={<ProtectedRoute element={()=> <DryFruits items={filterDryFruits}/>} />} />
              <Route path='/categories/grocery&kitchen/breakfast' element={<ProtectedRoute element={() => <Breakfast items={filterBreakfast} />} />} />
              <Route path='/categories/grocery&kitchen/packaged-food' element={<ProtectedRoute element={() => <PackagedFood items={filterPackaged}/>} />} />
            </Routes>
          </Suspense>
          <NavbarMobile />
        </Router>
      )}
    </div>
  );
};

export default App;