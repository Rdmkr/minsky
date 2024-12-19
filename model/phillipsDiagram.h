/*
  @copyright Steve Keen 2023
  @author Russell Standish
  This file is part of Minsky.

  Minsky is free software: you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Minsky is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Minsky.  If not, see <http://www.gnu.org/licenses/>.
*/

#ifndef PHILLIPS_DIAGRAM_H
#define PHILLIPS_DIAGRAM_H
#include "classdesc_access.h"
#include "renderNativeWindow.h"
#include "variable.h"
#include "wire.h"

#include <vector>
#include <map>

namespace minsky
{
  using FlowVar=Variable<VariableType::flow>;
  using StockVar=Variable<VariableType::stock>;

  class PhillipsFlow: public Wire
  {
    CLASSDESC_ACCESS(PhillipsFlow);
  public:
    PhillipsFlow()=default;
    PhillipsFlow(const std::weak_ptr<Port>& from, const std::weak_ptr<Port>& to):
      Wire(from,to) {}
    static std::map<Units, double> maxFlow;
    classdesc::Exclude<std::vector<std::pair<double, FlowVar>>> terms;

    Units units() const {
      if (terms.empty()) return {};
      return terms.front().second.units();
    }
    void addTerm(double coef, const std::string& name) {terms.emplace_back(coef, name);}
    double value() const {
      double r=0;
      for (auto& i: terms)
        r+=i.first*i.second.value();
      return r;
    }
    void draw(cairo_t*);
  };

  
  class PhillipsStock: public StockVar
  {
  public:
    PhillipsStock() {addPorts();}
    PhillipsStock(const StockVar& x): StockVar(x) {
      group.reset();
      addPorts();
      rotation(0);
      updateBoundingBox();
    }
    static std::map<Units, double> maxStock;
    std::size_t numPorts() const override {return 2;}
    void draw(cairo_t* cairo) const override;
  };
  
  class PhillipsDiagram: public RenderNativeWindow
  {
    bool redraw(int, int, int width, int height) override;
    CLASSDESC_ACCESS(PhillipsDiagram);
    PhillipsStock* stockBeingMoved=nullptr;   // weak reference
    PhillipsStock* stockBeingRotated=nullptr; // weak reference
    Exclude<Point> rotateOrigin;
    PhillipsFlow* flowBeingEdited=nullptr;    // weak reference
    int handleSelected=0;
    float x=0,y=0; ///< position for panning
  public:
    std::map<std::string, PhillipsStock> stocks;
    std::map<std::pair<std::string,std::string>, PhillipsFlow> flows;
    void requestRedraw() {if (surface.get()) surface->requestRedraw();}
    /// populate phillips diagram from Godley tables in model
    void init() override;
    void clear() {
      stocks.clear();
      flows.clear();
    }

    void mouseDown(float x, float y) override;
    void mouseUp(float x, float y) override;
    void mouseMove(float x, float y) override;
    void moveTo(float x, float y) override {this->x=x; this->y=y; requestRedraw();}
    std::vector<float> position() const override {return {x,y};}
    void startRotatingItem(float x, float y);
    bool hasScrollBars() const override {return true;}
  };
}

#include "phillipsDiagram.cd"
#endif
