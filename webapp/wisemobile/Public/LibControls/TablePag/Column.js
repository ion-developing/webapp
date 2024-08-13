/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'jquery.sap.global', 'sap/ui/core/Element', 'sap/ui/core/RenderManager', 'sap/ui/model/Filter', 'sap/ui/model/Sorter', 'sap/ui/model/Type', 'sap/ui/model/type/String', './library', './ColumnMenu'
], function(q, E, R, F, S, T, a, b, cM) {
    //'use strict';
    var C = E.extend('sap.ui.table.Column', {
        metadata: {
            library: 'sap.ui.table',
            properties: {
                width: {
                    type: 'sap.ui.core.CSSSize',
                    group: 'Dimension',
                    defaultValue: null
                },
                flexible: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: true
                },
                resizable: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: true
                },
                hAlign: {
                    type: 'sap.ui.core.HorizontalAlign',
                    group: 'Appearance',
                    defaultValue: sap.ui.core.HorizontalAlign.Begin
                },
                sorted: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: false
                },
                sortOrder: {
                    type: 'sap.ui.table.SortOrder',
                    group: 'Appearance',
                    defaultValue: sap.ui.table.SortOrder.Ascending
                },
                sortProperty: {
                    type: 'string',
                    group: 'Behavior',
                    defaultValue: null
                },
                filtered: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: false
                },
                filterProperty: {
                    type: 'string',
                    group: 'Behavior',
                    defaultValue: null
                },
                filterValue: {
                    type: 'string',
                    group: 'Behavior',
                    defaultValue: null
                },
                filterOperator: {
                    type: 'string',
                    group: 'Behavior',
                    defaultValue: null
                },
                defaultFilterOperator: {
                    type: 'string',
                    group: 'Behavior',
                    defaultValue: null
                },
                filterType: {
                    type: 'any',
                    group: 'Misc',
                    defaultValue: null
                },
                grouped: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: false
                },
                visible: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: true
                },
                name: {
                    type: 'string',
                    group: 'Appearance',
                    defaultValue: null
                },
                showFilterMenuEntry: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: true
                },
                showSortMenuEntry: {
                    type: 'boolean',
                    group: 'Appearance',
                    defaultValue: true
                },
                headerSpan: {
                    type: 'any',
                    group: 'Behavior',
                    defaultValue: 1
                },
                autoResizable: {
                    type: 'boolean',
                    group: 'Behavior',
                    defaultValue: false
                }
            },
            defaultAggregation: 'label',
            aggregations: {
                label: {
                    type: 'sap.ui.core.Control',
                    altTypes: ['string'],
                    multiple: false
                },
                multiLabels: {
                    type: 'sap.ui.core.Control',
                    multiple: true,
                    singularName: 'multiLabel'
                },
                template: {
                    type: 'sap.ui.core.Control',
                    multiple: false
                },
                menu: {
                    type: 'sap.ui.unified.Menu',
                    multiple: false
                }
            },
            events: {
                columnMenuOpen: {
                    allowPreventDefault: true,
                    parameters: {
                        menu: {
                            type: 'sap.ui.unified.Menu'
                        }
                    }
                }
            }
        }
    });
    C._DEFAULT_FILTER_TYPE = new a();
    C.prototype.init = function() {
        this.oResBundle = sap.ui.getCore().getLibraryResourceBundle('sap.ui.table');
        this._oSorter = null;
        this.mSkipPropagation = {
            template: true
        };
    };
    C.prototype.exit = function() {
        var s = sap.ui.getCore().byId(this.getId() + '-sortIcon');
        if (s) {
            s.destroy();
        }
        var f = sap.ui.getCore().byId(this.getId() + '-filterIcon');
        if (f) {
            f.destroy();
        }
    };
    C.prototype.setParent = function(p, A, s) {
        E.prototype.setParent.apply(this, arguments);
        var m = this.getAggregation('menu');
        if (m && typeof m._updateReferences === 'function') {
            m._updateReferences(this);
        }
    };
    C.prototype.invalidate = function(o) {
        if (o !== this.getTemplate() && !(o instanceof cM)) {
            E.prototype.invalidate.apply(this, arguments);
        }
    };
    C.prototype.setLabel = function(l) {
        var L = l;
        if (typeof(l) === 'string') {
            L = sap.ui.table.TableHelper.createLabel({
                text: l
            });
        }
        this.setAggregation('label', L);
        return this;
    };
    C.prototype.setTemplate = function(t) {
        var o = t;
        if (typeof(t) === 'string') {
            o = sap.ui.table.TableHelper.createTextView().bindProperty('text', t);
        }
        this.setAggregation('template', o);
        this.invalidate();
        return this;
    };
    C.prototype.getMenu = function() {
        var m = this.getAggregation('menu');
        if (!m) {
           var m = this._createMenu();
            this.setMenu(m);
        }
        return m;
    };
    C.prototype.invalidateMenu = function() {
        var m = this.getAggregation('menu');
        if (m && m._invalidate) {
            m._invalidate();
        }
    };
    C.prototype._menuHasItems = function() {
        var m = this.getAggregation('menu');
        var t = this.getParent();
        var M = function() {
            return (this.isSortableByMenu() || this.isFilterableByMenu() || this.isGroupableByMenu() || (t && t.getEnableColumnFreeze()) || (t && t.getShowColumnVisibilityMenu()));
        }.bind(this);
        return !!((m && m.getItems().length > 0) || M());
    };
    C.prototype.isFilterableByMenu = function() {
        return !!(this.getFilterProperty() && this.getShowFilterMenuEntry());
    };
    C.prototype.isSortableByMenu = function() {
        return !!(this.getSortProperty() && this.getShowSortMenuEntry());
    };
    C.prototype.isGroupableByMenu = function() {
        var t = this.getParent();
        return !!(t && t.getEnableGrouping && t.getEnableGrouping() && this.getSortProperty());
    };
    C.prototype.setMenu = function(m) {
        this.setAggregation('menu', m, true);
        return this;
    };
    C.prototype._createMenu = function() {
        //q.sap.require('sap.ui.table.ColumnMenu');
        if (!this._defaultMenu) {
            this._defaultMenu = new cM(this.getId() + '-menu', {
                ariaLabelledBy: this
            });
        }
        return this._defaultMenu;
    };
    C.prototype.setWidth = function(w) {
        this.setProperty('width', w);
        this.fireEvent('_widthChanged', {
            newWidth: w
        });
        return this;
    };
    C.prototype._setAppDefault = function(p, v) {
        if (!this._appDefaults) {
            this._appDefaults = {};
        }
        if (p == 'sorted') {
            this._appDefaults.sorted = v;
        } else if (p == 'sortOrder') {
            this._appDefaults.sortOrder = v;
        } else if (p == 'filtered') {
            this._appDefaults.filtered = v;
        } else if (p == 'filterValue') {
            this._appDefaults.filterValue = v;
        } else if (p == 'filterOperator') {
            this._appDefaults.filterOperator = v;
        }
    };
    C.prototype._restoreAppDefaults = function() {
        if (this._appDefaults) {
            this.setProperty('sorted', this._appDefaults.sorted, true);
            this.setProperty('sortOrder', this._appDefaults.sortOrder, true);
            this.setProperty('filtered', this._appDefaults.filtered, true);
            this.setProperty('filterValue', this._appDefaults.filterValue, true);
            this.setProperty('filterOperator', this._appDefaults.filterOperator, true);
            this._renderSortIcon();
            this._renderFilterIcon();
        }
    };
    C.prototype.setSorted = function(f) {
        this.setProperty('sorted', f, true);
        this._setAppDefault('sorted', f);
        this._renderSortIcon();
        return this;
    };
    C.prototype.setSortOrder = function(t) {
        this.setProperty('sortOrder', t, true);
        this._setAppDefault('sortOrder', t);
        this._renderSortIcon();
        return this;
    };
    C.prototype.setFiltered = function(f) {
        this.setProperty('filtered', f, true);
        this._setAppDefault('filtered', f);
        this._renderFilterIcon();
        return this;
    };
    C.prototype.setFilterValue = function(v) {
        this.setProperty('filterValue', v, true);
        this._setAppDefault('filterValue', v);
        var m = this.getMenu();
        if (m && m instanceof cM) {
            m._setFilterValue(v);
        }
        return this;
    };
    C.prototype.setFilterOperator = function(v) {
        this.setProperty('filterOperator', v, true);
        this._setAppDefault('filterOperator', v);
        return this;
    };
    C.prototype.onmousedown = function(e) {
        var m = this.getAggregation('menu');
        this._bSkipOpen = m && m.bOpen;
    };
    C.prototype.onmouseout = function(e) {
        if (this._bSkipOpen && q.sap.checkMouseEnterOrLeave(e, this.getDomRef())) {
            this._bSkipOpen = false;
        }
    };
    C.prototype._openMenu = function(d, w) {
        if (this._bSkipOpen) {
            this._bSkipOpen = false;
            return;
        }
        var m = this.getMenu();
        var e = this.fireColumnMenuOpen({
            menu: m
        });
        if (e) {
            var c = sap.ui.core.Popup.Dock;
            var f = d;
            if (!d) {
                d = this.getDomRef();
                f = this.getFocusDomRef();
            }
            m.open(!!w, f, c.BeginTop, c.BeginBottom, d, 'none none');
        }
    };
    C.prototype.toggleSort = function() {
        this.sort(this.getSorted() && this.getSortOrder() === sap.ui.table.SortOrder.Ascending);
    };
    C.prototype.sort = function(d, A) {
        var t = this.getParent();
        if (t) {
            t.pushSortedColumn(this, A);
            var n = d ? sap.ui.table.SortOrder.Descending : sap.ui.table.SortOrder.Ascending;
            var e = t.fireSort({
                column: this,
                sortOrder: n,
                columnAdded: A
            });
            if (e) {
                var s = [];
                var c = t._aSortedColumns;
                var f = t.getColumns();
                for (var i = 0, l = f.length; i < l; i++) {
                    f[i].setProperty('sorted', false, true);
                    f[i].setProperty('sortOrder', sap.ui.table.SortOrder.Ascending, true);
                    f[i]._renderSortIcon();
                    if (q.inArray(f[i], c) < 0) {
                        delete f[i]._oSorter;
                    }
                }
                for (var i = 0, l = c.length; i < l; i++) {
                    c[i].setProperty('sorted', true, true);
                    c[i].setProperty('sortOrder', n, true);
                    c[i]._renderSortIcon();
                    if (this === c[i]) {
                        this._oSorter = new S(c[i].getSortProperty(), c[i].getSortOrder() === sap.ui.table.SortOrder.Descending);
                    }
                    s.push(c[i]._oSorter);
                }
                if (t.isBound('rows')) {
                    t.getBinding('rows').sort(s);
                    if (this._afterSort) {
                        this._afterSort();
                    }
                }
                this._renderSortIcon();
            }
        }
        return this;
    };

    function g(i) {
        var r = sap.ui.getCore().createRenderManager(),
            h = r.getHTML(i);
        r.destroy();
        return h;
    }
    C.prototype._renderSortIcon = function() {
        var t = this.getParent();
        if (t && t.getDomRef()) {
            if (this.getSorted()) {
                var c = sap.ui.getCore().getConfiguration().getTheme();
                //var i = sap.ui.getCore().byId(this.getId() + '-sortIcon') || sap.ui.table.TableHelper.createImage(this.getId() + '-sortIcon');
                /*
                var i = sap.ui.getCore().byId(this.getId() + '-sortIcon') || new sap.m.Image(this.getId() + '-sortIcon',{ densityAware:false });
                i.addStyleClass('sapUiTableColIconsOrder');
                if (this.getSortOrder() === sap.ui.table.SortOrder.Ascending) {
                    //i.setSrc(sap.ui.resource('sap.ui.table', 'themes/' + c + '/img/ico12_sort_asc.gif'));
                    i.setSrc('./tg_multiplesapp/Public/Img/ico12_sort_asc.gif');
                } else {
                    //i.setSrc(sap.ui.resource('sap.ui.table', 'themes/' + c + '/img/ico12_sort_desc.gif'));
                    i.setSrc('./tg_multiplesapp/Public/Img/ico12_sort_desc.gif');
                }*/
    			var i= sap.ui.getCore().byId(this.getId() + '-sortIcon') || new sap.ui.core.Icon(this.getId() + '-sortIcon');
                i.addStyleClass('sapUiTableColIconsOrder');
    			if (this.getSortOrder() === sap.ui.table.SortOrder.Ascending) {
                    i.setSrc(sap.ui.core.IconPool.getIconURI("sort-ascending"));
                } else {
                    i.setSrc(sap.ui.core.IconPool.getIconURI("sort-descending"));
                }
                var h = g(i);
                this.$().find('.sapUiTableColIconsOrder').remove();
                q(h).prependTo(this.getDomRef('icons'));
                this.$().attr('aria-sort', this.getSortOrder() === sap.ui.table.SortOrder.Ascending ? 'ascending' : 'descending');
                //this.$().find('.sapUiTableColCell').addClass('sapUiTableColSorted');
            } else {
                this.$().find('.sapUiTableColIconsOrder').remove();
                this.$().removeAttr('aria-sort');
                //this.$().find('.sapUiTableColCell').removeClass('sapUiTableColSorted');
            }
        }
    };
    C.prototype._getFilter = function() {
        var f, p = this.getFilterProperty(),
            v = this.getFilterValue(),
            o = this.getFilterOperator(),
            P, s, t = this.getFilterType() || C._DEFAULT_FILTER_TYPE,
            i = t instanceof a,
            B;
        if (v) {
            if (!o) {
                B = v.match(/(.*)\s*\.\.\s*(.*)/);
                if (v.indexOf('=') == 0) {
                    o = sap.ui.model.FilterOperator.EQ;
                    P = v.substr(1);
                } else if (v.indexOf('!=') == 0) {
                    o = sap.ui.model.FilterOperator.NE;
                    P = v.substr(2);
                } else if (v.indexOf('<=') == 0) {
                    o = sap.ui.model.FilterOperator.LE;
                    P = v.substr(2);
                } else if (v.indexOf('<') == 0) {
                    o = sap.ui.model.FilterOperator.LT;
                    P = v.substr(1);
                } else if (v.indexOf('>=') == 0) {
                    o = sap.ui.model.FilterOperator.GE;
                    P = v.substr(2);
                } else if (v.indexOf('>') == 0) {
                    o = sap.ui.model.FilterOperator.GT;
                    P = v.substr(1);
                } else if (B) {
                    if (B[1] && B[2]) {
                        o = sap.ui.model.FilterOperator.BT;
                        P = B[1];
                        s = B[2];
                    } else if (B[1] && !B[2]) {
                        o = sap.ui.model.FilterOperator.GE;
                        P = B[1];
                    } else {
                        o = sap.ui.model.FilterOperator.LE;
                        P = B[2];
                    }
                } else if (i && v.indexOf('*') == 0 && v.lastIndexOf('*') == v.length - 1) {
                    o = sap.ui.model.FilterOperator.Contains;
                    P = v.substr(1, v.length - 2);
                } else if (i && v.indexOf('*') == 0) {
                    o = sap.ui.model.FilterOperator.EndsWith;
                    P = v.substr(1);
                } else if (i && v.lastIndexOf('*') == v.length - 1) {
                    o = sap.ui.model.FilterOperator.StartsWith;
                    P = v.substr(0, v.length - 1);
                } else {
                    if (this.getDefaultFilterOperator()) {
                        o = this.getDefaultFilterOperator();
                    } else {
                        if (i) {
                            o = sap.ui.model.FilterOperator.Contains;
                        } else {
                            o = sap.ui.model.FilterOperator.EQ;
                        }
                    }
                    P = v.substr(0);
                }
                if (!s) {
                    f = new F(p, o, this._parseFilterValue(P));
                } else {
                    f = new F(p, o, this._parseFilterValue(P), this._parseFilterValue(s));
                }
            } else {
                f = new F(p, o, this._parseFilterValue(v));
            }
        }
        return f;
    };
    C.prototype.filter = function(v) {
        var t = this.getParent();
        if (t && t.isBound('rows')) {
            var c = t.fireFilter({
                column: this,
                value: v
            });
            if (c) {
                this.setProperty('filtered', !!v, true);
                this.setProperty('filterValue', v, true);
                var m = this.getMenu();
                if (m && m instanceof cM) {
                    m._setFilterValue(v);
                }
                var f = [];
                var d = t.getColumns();
                for (var i = 0, l = d.length; i < l; i++) {
                    var o = d[i],
                        h;
                    m = o.getMenu();
                    try {
                        h = o._getFilter();
                        if (m && m instanceof cM) {
                            m._setFilterState(sap.ui.core.ValueState.None);
                        }
                    } catch (e) {
                        if (m && m instanceof cM) {
                            m._setFilterState(sap.ui.core.ValueState.Error);
                        }
                        continue;
                    }
                    if (h) {
                        f.push(h);
                    }
                }
                t.getBinding('rows').filter(f, sap.ui.model.FilterType.Control);
                this._renderFilterIcon();
            }
        }
        return this;
    };
    C.prototype._parseFilterValue = function(v) {
        var f = this.getFilterType();
        if (f) {
            if (q.isFunction(f)) {
                v = f(v);
            } else {
                v = f.parseValue(v, 'string');
            }
        }
        return v;
    };
    C.prototype._renderFilterIcon = function() {
        var t = this.getParent();
        if (t && t.getDomRef()) {
            var c = sap.ui.getCore().getConfiguration().getTheme();
            var i = sap.ui.getCore().byId(this.getId() + '-filterIcon') || new sap.ui.core.Icon({
                id: this.getId() + '-filterIcon',
                decorative: false,
                alt: t._oResBundle.getText('TBL_FILTER_ICON_TEXT')
            });
            i.$().remove();
            i.addStyleClass('sapUiTableColIconsFilter');
            if (this.getFiltered()) {
                //i.setSrc(sap.ui.resource('sap.ui.table', 'themes/' + c + '/img/ico12_filter.gif'));
            	i.setSrc(sap.ui.core.IconPool.getIconURI("filter"));
                var h = g(i);
                q(h).prependTo(this.getDomRef('icons'));
                //this.$().find('.sapUiTableColCell').addClass('sapUiTableColFiltered');
            } else {
                //this.$().find('.sapUiTableColCell').removeClass('sapUiTableColFiltered');
            }
        }
    };
    C.prototype._restoreIcons = function() {
        if (this.getSorted()) {
            this._renderSortIcon();
        }
        if (this.getFiltered()) {
            this._renderFilterIcon();
        }
    };
    C.prototype.shouldRender = function() {
        return this.getVisible() && !this.getGrouped();
    };
    C.prototype.setFilterType = function(t) {
        var o = t;
        if (typeof(t) === 'string') {
            try {
                var c = q.sap.parseJS(t);
                if (typeof(c.type) === 'string') {
                    var f = q.sap.getObject(c.type);
                    o = f && new f(c.formatOptions, c.constraints);
                }
            } catch (e) {
                var f = q.sap.getObject(t);
                o = f && new f();
            }
            if (!(o instanceof T)) {
                q.sap.log.error('The filter type is not an instance of sap.ui.model.Type! Ignoring the filter type!');
                o = undefined;
            }
        }
        this.setProperty('filterType', o, true);
        return this;
    };
    C.prototype.getIndex = function() {
        var t = this.getParent();
        if (t) {
            return t.indexOfColumn(this);
        } else {
            return -1;
        }
    };
    return C;
}, true);