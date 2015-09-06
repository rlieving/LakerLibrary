"use strict";

var Laker = Laker || {};

Laker.html = {
    
    attr: function (obj) {
        
        var attr = "", prop, idx;
        for(idx in obj) {
            prop = obj[idx].toString();
            attr += idx.trim() + "='" + prop.trim() + "' ";
        }
        return attr.trim();
    },
    
    tag: function(tagName, val, attrObject) {
        
        var t = tagName +" " + Laker.html.attr(attrObject);
        
        return "<"+ t.trim() + ">" 
            + val + "</" + tagName + ">";
    },
    
    td: function (val, attr) {
        return Laker.html.tag("td", val, attr);
    },
    
    tr: function (val, attr) {
        return Laker.html.tag("tr", val, attr);
    },
    
    th:  function (val, attr) {
        return Laker.html.tag("th", val, attr);
    },
    
    Table: function (tblAttr) {
        
        var t ={},
            isValid = Laker.utility.isValidObject;
        
        function Header(headerAttr, headerTdAttr) {
            
            var h = [];
            
            h.addTd = function(td, tdAttr) {
                tdAttr = isValid(tdAttr) ? tdAttr : headerTdAttr;
                h.push(Laker.html.th(td, tdAttr));
                return h;
            };
            
            h.toString = function() {
                return(Laker.html.tag("tr", h.join(""), headerAttr));
            };
            
            return h;
        }
        
        function Row(rowAttr, rowTdAttr) {
            
            var r = [];
            
            r.addTd = function(td, tdAttr) {
                tdAttr = isValid(tdAttr) ? tdAttr : rowTdAttr;
                r.push(Laker.html.td(td, tdAttr));
                return r;
            };
            
            r.toString = function() {
                return(Laker.html.tag("tr", r.join(""), rowAttr));
            };
            
            r.number = 0;
            
            return r;
        }
        
        function Rows() {
            
            var r = [];
            
            r.add = function(row) {
                r.push(row);
            };
            
            r.toString = function() {
                return r.join("");
            };    
            return r;
        }
        
        function Title(val, rowAttr, rowTdAttr) {
            
            // table title
            var tt = {};
            
            tt.text = val;
            
            tt.toString = function() {
                
                if (tt.text.length === 0) { return tt.text; }
                
                rowTdAttr = isValid(rowTdAttr) ? rowTdAttr : {};
                rowTdAttr.colspan = t.Header.length;
                
                return Laker.html.tr(
                    Laker.html.td(tt.text, rowTdAttr), rowAttr
                );
            }
            
            return tt;
        }
        
        t.createHeader = function(headerAttr, tdAttr) {  
            t.Header = new Header(headerAttr, tdAttr);
            return t.Header;    
        };
        
        t.createTitle = function(val, rowAttr, rowTdAttr) {
            t.Title = new Title(val, rowAttr, rowTdAttr);
            return t.Title;
        };
        
        t.Rows = new Rows();
        
        t.createRow = function(rowAttr, tdAttr) {
            
            var r = new Row(rowAttr, tdAttr);
            r.number = t.Rows.length + 1;
            
            return r;
        };
        
        t.toString = function() {
            
            var s = "";
            
            if(t.Title) {
                s += t.Title.toString();
            }
            
            if(t.Header) {
                s += t.Header.toString();
            }

            s += t.Rows.toString();
            
            return Laker.html.tag("table", s, tblAttr);
        };
        
        return t;
    }
    
};

Laker.style = {
    
    lakerTitle: {
        "border": "none",
        "font-weight": "bold",
        "padding" : "5px 5px 10px 5px",
        "font-size": "larger"
    },
    
    lakerTable: {
        "border-collapse": "collapse",
        "margin-top": "10px",
        width: "99%"
    },

    lakerHeader: {
        "background-color":  "#7D7D7D",
        color: "#FFFFFF",
        "font-weight": "normal",
        padding: "5px",
        border: "solid #A9A9A9 1px",
        margin: "0",
        "text-align": "left"
    },

    lakerData: {
        "font-size": "90%",
        padding: "5px",
        margin: "0",
        border: "solid #A9A9A9 1px"
    },

    highlightRow: {
        "font-weight": "bold",
         color: "#7E4E99",
         "font-size": "110%"
    },

    evenRow: {  
        "background-color": "#D5D5D5",
        color: "#4A4949"
    }
};


Laker.utility = {
    
    get: function (propName) {
            var val = '';
            if (this.hasOwnProperty(propName)) {
                val = this[propName];
            }
        return val;
    },
    
    isValidObject: function (obj) {
        return (obj !== undefined) && (Object.keys(obj).length > 0);
    },
    
    applyGoogleRecord: function (obj, gString) {   
        
        var gCol;
        
        $.each(gString.split(','), function (idx, val) {
            gCol = val.split(':')[0].trim();
            obj[gCol] = val.split(':')[1].trim();
        });
    }
    
};