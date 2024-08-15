"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2857],{

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 32857:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/

    

    var oop = __webpack_require__(2645);
    var TextMode = (__webpack_require__(49432).Mode);
    var QmlHighlightRules = (__webpack_require__(1662)/* .QmlHighlightRules */ .i);
    var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

    var Mode = function() {
        this.HighlightRules = QmlHighlightRules;
        this.foldingRules = new FoldMode();
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.lineCommentStart = "//";
        this.blockComment = {start: "/*", end: "*/"};
        this.$quotes = { '"': '"', "'": "'" };
        this.$id = "ace/mode/qml";
    }).call(Mode.prototype);

    exports.Mode = Mode;


/***/ }),

/***/ 1662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

    var QmlHighlightRules = function() {
        // see: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
        var keywordMapper = this.createKeywordMapper({
            "variable.language":
                "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"  + // Constructors
                "Namespace|QName|XML|XMLList|"                                             + // E4X
                "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
                "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
                "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
                "SyntaxError|TypeError|URIError|"                                          +
                "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
                "isNaN|parseFloat|parseInt|"                                               +
                "JSON|Math|"                                                               + // Other
                "this|arguments|prototype|window|document"                                 , // Pseudo
            "keyword":
                "const|yield|import|get|set|async|await|" +
                "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
                "if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
                // invalid or reserved
                "__parent__|__count__|escape|unescape|with|__proto__|" +
                "class|enum|extends|super|export|implements|private|public|interface|package|protected|static|" +
                // qml
                "readonly|string|int|bool|date|color|url|real|double|var|variant|" +
                "height|width|anchors|parent|" +
                "Abstract3DSeries|AbstractActionInput|AbstractAnimation|AbstractAxis|AbstractAxis3D|AbstractAxisInput|" +
                "AbstractBarSeries|AbstractButton|AbstractClipAnimator|AbstractClipBlendNode|AbstractDataProxy|AbstractGraph3D|" +
                "AbstractInputHandler3D|AbstractPhysicalDevice|AbstractRayCaster|AbstractSeries|AbstractSkeleton|AbstractTextureImage|" +
                "Accelerometer|AccelerometerReading|Accessible|Action|ActionGroup|ActionInput|" +
                "AdditiveClipBlend|Address|Affector|Age|AlphaCoverage|AlphaTest|" +
                "Altimeter|AltimeterReading|AmbientLightReading|AmbientLightSensor|AmbientTemperatureReading|AmbientTemperatureSensor|" +
                "AnalogAxisInput|AnchorAnimation|AnchorChanges|AngleDirection|AnimatedImage|AnimatedSprite|" +
                "Animation|AnimationController|AnimationGroup|Animator|ApplicationWindow|ApplicationWindowStyle|" +
                "AreaSeries|Armature|AttenuationModelInverse|AttenuationModelLinear|Attractor|Attribute|" +
                "Audio|AudioCategory|AudioEngine|AudioListener|AudioSample|AuthenticationDialogRequest|" +
                "Axis|AxisAccumulator|AxisSetting|BackspaceKey|Bar3DSeries|BarCategoryAxis|" +
                "BarDataProxy|BarSeries|BarSet|Bars3D|BaseKey|Behavior|" +
                "Binding|Blend|BlendEquation|BlendEquationArguments|BlendedClipAnimator|BlitFramebuffer|" +
                "BluetoothDiscoveryModel|BluetoothService|BluetoothSocket|BorderImage|BorderImageMesh|BoxPlotSeries|" +
                "BoxSet|BrightnessContrast|Buffer|BusyIndicator|BusyIndicatorStyle|Button|" +
                "ButtonAxisInput|ButtonGroup|ButtonStyle|Calendar|CalendarStyle|Camera|" +
                "Camera3D|CameraCapabilities|CameraCapture|CameraExposure|CameraFlash|CameraFocus|" +
                "CameraImageProcessing|CameraLens|CameraRecorder|CameraSelector|CandlestickSeries|CandlestickSet|" +
                "Canvas|Canvas3D|Canvas3DAbstractObject|Canvas3DActiveInfo|Canvas3DBuffer|Canvas3DContextAttributes|" +
                "Canvas3DFrameBuffer|Canvas3DProgram|Canvas3DRenderBuffer|Canvas3DShader|Canvas3DShaderPrecisionFormat|Canvas3DTexture|" +
                "Canvas3DTextureProvider|Canvas3DUniformLocation|CanvasGradient|CanvasImageData|CanvasPixelArray|Category|" +
                "CategoryAxis|CategoryAxis3D|CategoryModel|CategoryRange|ChangeLanguageKey|ChartView|" +
                "CheckBox|CheckBoxStyle|CheckDelegate|CircularGauge|CircularGaugeStyle|ClearBuffers|" +
                "ClipAnimator|ClipPlane|CloseEvent|ColorAnimation|ColorDialog|ColorDialogRequest|" +
                "ColorGradient|ColorGradientStop|ColorMask|ColorOverlay|Colorize|Column|" +
                "ColumnLayout|ComboBox|ComboBoxStyle|Compass|CompassReading|Component|Component3D|" +
                "ComputeCommand|ConeGeometry|ConeMesh|ConicalGradient|Connections|ContactDetail|" +
                "ContactDetails|Container|Context2D|Context3D|ContextMenuRequest|Control|" +
                "CoordinateAnimation|CuboidGeometry|CuboidMesh|CullFace|CumulativeDirection|" +
                "Custom3DItem|Custom3DLabel|Custom3DVolume|CustomParticle|CylinderGeometry|CylinderMesh|" +
                "Date|DateTimeAxis|DelayButton|DelayButtonStyle|DelegateChoice|DelegateChooser|DelegateModel|" +
                "DelegateModelGroup|DepthTest|Desaturate|Dial|DialStyle|Dialog|DialogButtonBox|DiffuseMapMaterial|" +
                "DiffuseSpecularMapMaterial|DiffuseSpecularMaterial|Direction|DirectionalBlur|DirectionalLight|DispatchCompute|" +
                "Displace|DistanceReading|DistanceSensor|Dithering|DoubleValidator|Drag|DragEvent|DragHandler|Drawer|DropArea|" +
                "DropShadow|DwmFeatures|DynamicParameter|EditorialModel|Effect|EllipseShape|Emitter|EnterKey|EnterKeyAction|" +
                "Entity|EntityLoader|EnvironmentLight|EventConnection|EventPoint|EventTouchPoint|ExclusiveGroup|ExtendedAttributes|" +
                "ExtrudedTextGeometry|ExtrudedTextMesh|FastBlur|FileDialog|FileDialogRequest|FillerKey|FilterKey|FinalState|" +
                "FirstPersonCameraController|Flickable|Flipable|Flow|FocusScope|FolderListModel|FontDialog|FontLoader|" +
                "FontMetrics|FormValidationMessageRequest|ForwardRenderer|Frame|FrameAction|FrameGraphNode|Friction|" +
                "FrontFace|FrustumCulling|FullScreenRequest|GLStateDumpExt|GammaAdjust|Gauge|GaugeStyle|GaussianBlur|" +
                "GeocodeModel|Geometry|GeometryRenderer|GestureEvent|Glow|GoochMaterial|Gradient|GradientStop|GraphicsApiFilter|" +
                "GraphicsInfo|Gravity|Grid|GridLayout|GridMesh|GridView|GroupBox|GroupGoal|Gyroscope|GyroscopeReading|HBarModelMapper|" +
                "HBoxPlotModelMapper|HCandlestickModelMapper|HPieModelMapper|HXYModelMapper|HandlerPoint|HandwritingInputPanel|" +
                "HandwritingModeKey|HeightMapSurfaceDataProxy|HideKeyboardKey|HistoryState|HolsterReading|HolsterSensor|HorizontalBarSeries|" +
                "|HorizontalPercentBarSeries|HorizontalStackedBarSeries|HoverHandler|HueSaturation|HumidityReading|HumiditySensor|" +
                "IRProximityReading|IRProximitySensor|Icon|Image|ImageModel|ImageParticle|InnerShadow|InputChord|InputContext|InputEngine|" +
                "InputHandler3D|InputMethod|InputModeKey|InputPanel|InputSequence|InputSettings|Instantiator|IntValidator|InvokedServices|" +
                "Item|ItemDelegate|ItemGrabResult|ItemModelBarDataProxy|ItemModelScatterDataProxy|ItemModelSurfaceDataProxy|ItemParticle|" +
                "ItemSelectionModel|IviApplication|IviSurface|JavaScriptDialogRequest|Joint|JumpList|JumpListCategory|JumpListDestination|" +
                "JumpListLink|JumpListSeparator|Key|KeyEvent|KeyIcon|KeyNavigation|KeyPanel|KeyboardColumn|KeyboardDevice|KeyboardHandler|" +
                "KeyboardLayout|KeyboardLayoutLoader|KeyboardRow|KeyboardStyle|KeyframeAnimation|Keys|Label|Layer|LayerFilter|Layout|" +
                "LayoutMirroring|Legend|LerpBlend|LevelAdjust|LevelOfDetail|LevelOfDetailBoundingSphere|LevelOfDetailLoader|" +
                "LevelOfDetailSwitch|LidReading|LidSensor|Light|Light3D|LightReading|LightSensor|LineSeries|LineShape|LineWidth|" +
                "LinearGradient|ListElement|ListModel|ListView|Loader|Locale|Location|LogValueAxis|LogValueAxis3DFormatter|LoggingCategory|" +
                "LogicalDevice|Magnetometer|MagnetometerReading|Map|MapCircle|MapCircleObject|MapCopyrightNotice|MapGestureArea|MapIconObject|" +
                "MapItemGroup|MapItemView|MapObjectView|MapParameter|MapPinchEvent|MapPolygon|MapPolygonObject|MapPolyline|MapPolylineObject|" +
                "MapQuickItem|MapRectangle|MapRoute|MapRouteObject|MapType|Margins|MaskShape|MaskedBlur|Material|Matrix4x4|MediaPlayer|" +
                "MemoryBarrier|Menu|MenuBar|MenuBarItem|MenuBarStyle|MenuItem|MenuSeparator|MenuStyle|Mesh|MessageDialog|ModeKey|MorphTarget|" +
                "MorphingAnimation|MouseArea|MouseDevice|MouseEvent|MouseHandler|MultiPointHandler|MultiPointTouchArea|MultiSampleAntiAliasing|" +
                "Navigator|NdefFilter|NdefMimeRecord|NdefRecord|NdefTextRecord|NdefUriRecord|NearField|NoDepthMask|NoDraw|Node|NodeInstantiator|" +
                "NormalDiffuseMapAlphaMaterial|NormalDiffuseMapMaterial|NormalDiffuseSpecularMapMaterial|Number|NumberAnimation|NumberKey|Object3D|" +
                "ObjectModel|ObjectPicker|OpacityAnimator|OpacityMask|OpenGLInfo|OrbitCameraController|OrientationReading|OrientationSensor|Overlay|" +
                "Package|Page|PageIndicator|Pane|ParallelAnimation|Parameter|ParentAnimation|ParentChange|Particle|ParticleGroup|ParticlePainter|" +
                "ParticleSystem|Path|PathAngleArc|PathAnimation|PathArc|PathAttribute|PathCubic|PathCurve|PathElement|PathInterpolator|PathLine|" +
                "PathMove|PathPercent|PathQuad|PathSvg|PathView|PauseAnimation|PerVertexColorMaterial|PercentBarSeries|PhongAlphaMaterial|" +
                "PhongMaterial|PickEvent|PickLineEvent|PickPointEvent|PickTriangleEvent|PickingSettings|Picture|PieMenu|PieMenuStyle|PieSeries|" +
                "PieSlice|PinchArea|PinchEvent|PinchHandler|Place|PlaceAttribute|PlaceSearchModel|PlaceSearchSuggestionModel|PlaneGeometry|" +
                "PlaneMesh|PlayVariation|Playlist|PlaylistItem|Plugin|PluginParameter|PointDirection|PointHandler|PointLight|PointSize|" +
                "PointerDevice|PointerDeviceHandler|PointerEvent|PointerHandler|PolarChartView|PolygonOffset|Popup|Position|PositionSource|" +
                "Positioner|PressureReading|PressureSensor|Product|ProgressBar|ProgressBarStyle|PropertyAction|PropertyAnimation|PropertyChanges|" +
                "ProximityFilter|ProximityReading|ProximitySensor|QAbstractState|QAbstractTransition|QSignalTransition|" +
                "QVirtualKeyboardSelectionListModel|Qt|QtMultimedia|QtObject|QtPositioning|QuaternionAnimation|QuotaRequest|RadialBlur|" +
                "RadialGradient|Radio|RadioButton|RadioButtonStyle|RadioData|RadioDelegate|RangeSlider|Ratings|RayCaster|Rectangle|" +
                "RectangleShape|RectangularGlow|RecursiveBlur|RegExpValidator|RegisterProtocolHandlerRequest|RenderCapture|" +
                "RenderCaptureReply|RenderPass|RenderPassFilter|RenderSettings|RenderState|RenderStateSet|RenderSurfaceSelector|" +
                "RenderTarget|RenderTargetOutput|RenderTargetSelector|Repeater|ReviewModel|Rotation|RotationAnimation|RotationAnimator|" +
                "RotationReading|RotationSensor|RoundButton|Route|RouteLeg|RouteManeuver|RouteModel|RouteQuery|RouteSegment|Row|" +
                "RowLayout|Scale|ScaleAnimator|Scatter3D|Scatter3DSeries|ScatterDataProxy|ScatterSeries|Scene2D|Scene3D|SceneLoader|" +
                "ScissorTest|Screen|ScreenRayCaster|ScriptAction|ScrollBar|ScrollIndicator|ScrollView|ScrollViewStyle|ScxmlStateMachine|" +
                "SeamlessCubemap|SelectionListItem|Sensor|SensorGesture|SensorGlobal|SensorReading|SequentialAnimation|Settings|" +
                "SettingsStore|ShaderEffect|ShaderEffectSource|ShaderProgram|ShaderProgramBuilder|Shape|ShellSurface|ShellSurfaceItem|" +
                "ShiftHandler|ShiftKey|Shortcut|SignalSpy|SignalTransition|SinglePointHandler|Skeleton|SkeletonLoader|Slider|SliderStyle|" +
                "SmoothedAnimation|SortPolicy|Sound|SoundEffect|SoundInstance|SpaceKey|SphereGeometry|SphereMesh|SpinBox|SpinBoxStyle|" +
                "SplineSeries|SplitView|SpotLight|SpringAnimation|Sprite|SpriteGoal|SpriteSequence|Stack|StackLayout|StackView|" +
                "StackViewDelegate|StackedBarSeries|State|StateChangeScript|StateGroup|StateMachine|StateMachineLoader|StatusBar|" +
                "StatusBarStyle|StatusIndicator|StatusIndicatorStyle|StencilMask|StencilOperation|StencilOperationArguments|StencilTest|" +
                "StencilTestArguments|Store|String|Supplier|Surface3D|Surface3DSeries|SurfaceDataProxy|SwipeDelegate|SwipeView|Switch|" +
                "SwitchDelegate|SwitchStyle|SymbolModeKey|SystemPalette|Tab|TabBar|TabButton|TabView|TabViewStyle|TableView|TableViewColumn|" +
                "TableViewStyle|TapHandler|TapReading|TapSensor|TargetDirection|TaskbarButton|Technique|TechniqueFilter|TestCase|Text|TextArea|" +
                "TextAreaStyle|TextEdit|TextField|TextFieldStyle|TextInput|TextMetrics|TextureImage|TextureImageFactory|Theme3D|ThemeColor|" +
                "ThresholdMask|ThumbnailToolBar|ThumbnailToolButton|TiltReading|TiltSensor|TimeoutTransition|Timer|ToggleButton|" +
                "ToggleButtonStyle|ToolBar|ToolBarStyle|ToolButton|ToolSeparator|ToolTip|Torch|TorusGeometry|TorusMesh|TouchEventSequence|" +
                "TouchInputHandler3D|TouchPoint|Trace|TraceCanvas|TraceInputArea|TraceInputKey|TraceInputKeyPanel|TrailEmitter|Transaction|" +
                "Transform|Transition|Translate|TreeView|TreeViewStyle|Tumbler|TumblerColumn|TumblerStyle|Turbulence|UniformAnimator|User|" +
                "VBarModelMapper|VBoxPlotModelMapper|VCandlestickModelMapper|VPieModelMapper|VXYModelMapper|ValueAxis|ValueAxis3D|" +
                "ValueAxis3DFormatter|Vector3dAnimation|VertexBlendAnimation|Video|VideoOutput|ViewTransition|Viewport|" +
                "VirtualKeyboardSettings|Wander|WavefrontMesh|WaylandClient|WaylandCompositor|WaylandHardwareLayer|" +
                "WaylandOutput|WaylandQuickItem|WaylandSeat|WaylandSurface|WaylandView|Waypoint|" +
                "WebChannel|WebEngine|WebEngineAction|WebEngineCertificateError|WebEngineDownloadItem|WebEngineHistory|" +
                "WebEngineHistoryListModel|WebEngineLoadRequest|WebEngineNavigationRequest|WebEngineNewViewRequest|WebEngineProfile|WebEngineScript|" +
                "WebEngineSettings|WebEngineView|WebSocket|WebSocketServer|WebView|WebViewLoadRequest|" +
                "WheelEvent|Window|WlShell|WlShellSurface|WorkerScript|XAnimator|" +
                "XYPoint|XYSeries|XdgDecorationManagerV1|XdgPopup|XdgPopupV5|XdgPopupV6|" +
                "XdgShell|XdgShellV5|XdgShellV6|XdgSurface|XdgSurfaceV5|XdgSurfaceV6|" +
                "XdgToplevel|XdgToplevelV6|XmlListModel|XmlRole|YAnimator|ZoomBlur",
            "storage.type":
                "const|let|var|function|" + // js
                "property|", // qml
            "constant.language":
                "null|Infinity|NaN|undefined",
            "support.function":
                "print|console\\.log",
            "constant.language.boolean": "true|false"
        }, "identifier");

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
        this.$rules = {
            "start" : [
                {
                    token : "string", // single line
                    regex : '"',
                    next  : "string"
                }, {
                    token : "constant.numeric", // hex
                    regex : "0[xX][0-9a-fA-F]+\\b"
                }, {
                    token : "constant.numeric", // float
                    regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                }, {
                    token : "constant.language.boolean",
                    regex : "(?:true|false)\\b"
                }, {
                    token : "text",
                    regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                }, {
                    token : "comment",
                    regex : "\\/\\/.*$"
                }, {
                    token : "comment.start",
                    regex : "\\/\\*",
                    next  : "comment"
                }, {
                    token : "paren.lparen",
                    regex : "[[({]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\])}]"
                }, {
                    token : "text",
                    regex : "\\s+"
                }, {
                    token : keywordMapper,
                    regex : "\\b\\w+\\b"
                }
            ],
            "string" : [
                {
                    token : "constant.language.escape",
                    regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
                }, {
                    token : "string",
                    regex : '"|$',
                    next  : "start"
                }, {
                    defaultToken : "string"
                }
            ],
            "comment" : [
                {
                    token : "comment.end",
                    regex : "\\*\\/",
                    next  : "start"
                }, {
                    defaultToken: "comment"
                }
            ]
        };

    };

    oop.inherits(QmlHighlightRules, TextHighlightRules);

    exports.i = QmlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI4NTcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsbUJBQW1CLHFDQUErQjs7QUFFbEQsZUFBZSxTQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDOUpEO0FBQ0E7QUFDQTs7QUFFQSxJQUFpQjs7QUFFakIsY0FBYyxtQkFBTyxDQUFDLElBQVk7QUFDbEMsbUJBQW1CLGlDQUFzQjtBQUN6Qyw0QkFBNEIsc0RBQWtEO0FBQzlFLG1CQUFtQiw4Q0FBb0M7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBLEtBQUs7O0FBRUwsSUFBSSxZQUFZOzs7Ozs7OztBQ3pCSDs7QUFFYixjQUFjLG1CQUFPLENBQUMsSUFBWTtBQUNsQyw2QkFBNkIsd0RBQW9EOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQ0FBaUM7QUFDakMsaUJBQWlCO0FBQ2pCO0FBQ0EsbUNBQW1DO0FBQ25DLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEVBQUUsY0FBYyxFQUFFO0FBQ2pFLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3FtbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3FtbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZS50bXBsLmpzXG4qL1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xuICAgIHZhciBRbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3FtbF9oaWdobGlnaHRfcnVsZXNcIikuUW1sSGlnaGxpZ2h0UnVsZXM7XG4gICAgdmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbiAgICB2YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUW1sSGlnaGxpZ2h0UnVsZXM7XG4gICAgICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG4gICAgfTtcbiAgICBvb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICAgICAgdGhpcy4kcXVvdGVzID0geyAnXCInOiAnXCInLCBcIidcIjogXCInXCIgfTtcbiAgICAgICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3FtbFwiO1xuICAgIH0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG4gICAgZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB2YXIgUW1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gc2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0c1xuICAgICAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6XG4gICAgICAgICAgICAgICAgXCJBcnJheXxCb29sZWFufERhdGV8RnVuY3Rpb258SXRlcmF0b3J8TnVtYmVyfE9iamVjdHxSZWdFeHB8U3RyaW5nfFByb3h5fFwiICArIC8vIENvbnN0cnVjdG9yc1xuICAgICAgICAgICAgICAgIFwiTmFtZXNwYWNlfFFOYW1lfFhNTHxYTUxMaXN0fFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAvLyBFNFhcbiAgICAgICAgICAgICAgICBcIkFycmF5QnVmZmVyfEZsb2F0MzJBcnJheXxGbG9hdDY0QXJyYXl8SW50MTZBcnJheXxJbnQzMkFycmF5fEludDhBcnJheXxcIiAgICtcbiAgICAgICAgICAgICAgICBcIlVpbnQxNkFycmF5fFVpbnQzMkFycmF5fFVpbnQ4QXJyYXl8VWludDhDbGFtcGVkQXJyYXl8XCIgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICBcIkVycm9yfEV2YWxFcnJvcnxJbnRlcm5hbEVycm9yfFJhbmdlRXJyb3J8UmVmZXJlbmNlRXJyb3J8U3RvcEl0ZXJhdGlvbnxcIiAgICsgLy8gRXJyb3JzXG4gICAgICAgICAgICAgICAgXCJTeW50YXhFcnJvcnxUeXBlRXJyb3J8VVJJRXJyb3J8XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgXCJkZWNvZGVVUkl8ZGVjb2RlVVJJQ29tcG9uZW50fGVuY29kZVVSSXxlbmNvZGVVUklDb21wb25lbnR8ZXZhbHxpc0Zpbml0ZXxcIiArIC8vIE5vbi1jb25zdHJ1Y3RvciBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICBcImlzTmFOfHBhcnNlRmxvYXR8cGFyc2VJbnR8XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgICAgICBcIkpTT058TWF0aHxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgLy8gT3RoZXJcbiAgICAgICAgICAgICAgICBcInRoaXN8YXJndW1lbnRzfHByb3RvdHlwZXx3aW5kb3d8ZG9jdW1lbnRcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLy8gUHNldWRvXG4gICAgICAgICAgICBcImtleXdvcmRcIjpcbiAgICAgICAgICAgICAgICBcImNvbnN0fHlpZWxkfGltcG9ydHxnZXR8c2V0fGFzeW5jfGF3YWl0fFwiICtcbiAgICAgICAgICAgICAgICBcImJyZWFrfGNhc2V8Y2F0Y2h8Y29udGludWV8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJpZnxpbnxvZnxpbnN0YW5jZW9mfG5ld3xyZXR1cm58c3dpdGNofHRocm93fHRyeXx0eXBlb2Z8bGV0fHZhcnx3aGlsZXx3aXRofGRlYnVnZ2VyfFwiICtcbiAgICAgICAgICAgICAgICAvLyBpbnZhbGlkIG9yIHJlc2VydmVkXG4gICAgICAgICAgICAgICAgXCJfX3BhcmVudF9ffF9fY291bnRfX3xlc2NhcGV8dW5lc2NhcGV8d2l0aHxfX3Byb3RvX198XCIgK1xuICAgICAgICAgICAgICAgIFwiY2xhc3N8ZW51bXxleHRlbmRzfHN1cGVyfGV4cG9ydHxpbXBsZW1lbnRzfHByaXZhdGV8cHVibGljfGludGVyZmFjZXxwYWNrYWdlfHByb3RlY3RlZHxzdGF0aWN8XCIgK1xuICAgICAgICAgICAgICAgIC8vIHFtbFxuICAgICAgICAgICAgICAgIFwicmVhZG9ubHl8c3RyaW5nfGludHxib29sfGRhdGV8Y29sb3J8dXJsfHJlYWx8ZG91YmxlfHZhcnx2YXJpYW50fFwiICtcbiAgICAgICAgICAgICAgICBcImhlaWdodHx3aWR0aHxhbmNob3JzfHBhcmVudHxcIiArXG4gICAgICAgICAgICAgICAgXCJBYnN0cmFjdDNEU2VyaWVzfEFic3RyYWN0QWN0aW9uSW5wdXR8QWJzdHJhY3RBbmltYXRpb258QWJzdHJhY3RBeGlzfEFic3RyYWN0QXhpczNEfEFic3RyYWN0QXhpc0lucHV0fFwiICtcbiAgICAgICAgICAgICAgICBcIkFic3RyYWN0QmFyU2VyaWVzfEFic3RyYWN0QnV0dG9ufEFic3RyYWN0Q2xpcEFuaW1hdG9yfEFic3RyYWN0Q2xpcEJsZW5kTm9kZXxBYnN0cmFjdERhdGFQcm94eXxBYnN0cmFjdEdyYXBoM0R8XCIgK1xuICAgICAgICAgICAgICAgIFwiQWJzdHJhY3RJbnB1dEhhbmRsZXIzRHxBYnN0cmFjdFBoeXNpY2FsRGV2aWNlfEFic3RyYWN0UmF5Q2FzdGVyfEFic3RyYWN0U2VyaWVzfEFic3RyYWN0U2tlbGV0b258QWJzdHJhY3RUZXh0dXJlSW1hZ2V8XCIgK1xuICAgICAgICAgICAgICAgIFwiQWNjZWxlcm9tZXRlcnxBY2NlbGVyb21ldGVyUmVhZGluZ3xBY2Nlc3NpYmxlfEFjdGlvbnxBY3Rpb25Hcm91cHxBY3Rpb25JbnB1dHxcIiArXG4gICAgICAgICAgICAgICAgXCJBZGRpdGl2ZUNsaXBCbGVuZHxBZGRyZXNzfEFmZmVjdG9yfEFnZXxBbHBoYUNvdmVyYWdlfEFscGhhVGVzdHxcIiArXG4gICAgICAgICAgICAgICAgXCJBbHRpbWV0ZXJ8QWx0aW1ldGVyUmVhZGluZ3xBbWJpZW50TGlnaHRSZWFkaW5nfEFtYmllbnRMaWdodFNlbnNvcnxBbWJpZW50VGVtcGVyYXR1cmVSZWFkaW5nfEFtYmllbnRUZW1wZXJhdHVyZVNlbnNvcnxcIiArXG4gICAgICAgICAgICAgICAgXCJBbmFsb2dBeGlzSW5wdXR8QW5jaG9yQW5pbWF0aW9ufEFuY2hvckNoYW5nZXN8QW5nbGVEaXJlY3Rpb258QW5pbWF0ZWRJbWFnZXxBbmltYXRlZFNwcml0ZXxcIiArXG4gICAgICAgICAgICAgICAgXCJBbmltYXRpb258QW5pbWF0aW9uQ29udHJvbGxlcnxBbmltYXRpb25Hcm91cHxBbmltYXRvcnxBcHBsaWNhdGlvbldpbmRvd3xBcHBsaWNhdGlvbldpbmRvd1N0eWxlfFwiICtcbiAgICAgICAgICAgICAgICBcIkFyZWFTZXJpZXN8QXJtYXR1cmV8QXR0ZW51YXRpb25Nb2RlbEludmVyc2V8QXR0ZW51YXRpb25Nb2RlbExpbmVhcnxBdHRyYWN0b3J8QXR0cmlidXRlfFwiICtcbiAgICAgICAgICAgICAgICBcIkF1ZGlvfEF1ZGlvQ2F0ZWdvcnl8QXVkaW9FbmdpbmV8QXVkaW9MaXN0ZW5lcnxBdWRpb1NhbXBsZXxBdXRoZW50aWNhdGlvbkRpYWxvZ1JlcXVlc3R8XCIgK1xuICAgICAgICAgICAgICAgIFwiQXhpc3xBeGlzQWNjdW11bGF0b3J8QXhpc1NldHRpbmd8QmFja3NwYWNlS2V5fEJhcjNEU2VyaWVzfEJhckNhdGVnb3J5QXhpc3xcIiArXG4gICAgICAgICAgICAgICAgXCJCYXJEYXRhUHJveHl8QmFyU2VyaWVzfEJhclNldHxCYXJzM0R8QmFzZUtleXxCZWhhdmlvcnxcIiArXG4gICAgICAgICAgICAgICAgXCJCaW5kaW5nfEJsZW5kfEJsZW5kRXF1YXRpb258QmxlbmRFcXVhdGlvbkFyZ3VtZW50c3xCbGVuZGVkQ2xpcEFuaW1hdG9yfEJsaXRGcmFtZWJ1ZmZlcnxcIiArXG4gICAgICAgICAgICAgICAgXCJCbHVldG9vdGhEaXNjb3ZlcnlNb2RlbHxCbHVldG9vdGhTZXJ2aWNlfEJsdWV0b290aFNvY2tldHxCb3JkZXJJbWFnZXxCb3JkZXJJbWFnZU1lc2h8Qm94UGxvdFNlcmllc3xcIiArXG4gICAgICAgICAgICAgICAgXCJCb3hTZXR8QnJpZ2h0bmVzc0NvbnRyYXN0fEJ1ZmZlcnxCdXN5SW5kaWNhdG9yfEJ1c3lJbmRpY2F0b3JTdHlsZXxCdXR0b258XCIgK1xuICAgICAgICAgICAgICAgIFwiQnV0dG9uQXhpc0lucHV0fEJ1dHRvbkdyb3VwfEJ1dHRvblN0eWxlfENhbGVuZGFyfENhbGVuZGFyU3R5bGV8Q2FtZXJhfFwiICtcbiAgICAgICAgICAgICAgICBcIkNhbWVyYTNEfENhbWVyYUNhcGFiaWxpdGllc3xDYW1lcmFDYXB0dXJlfENhbWVyYUV4cG9zdXJlfENhbWVyYUZsYXNofENhbWVyYUZvY3VzfFwiICtcbiAgICAgICAgICAgICAgICBcIkNhbWVyYUltYWdlUHJvY2Vzc2luZ3xDYW1lcmFMZW5zfENhbWVyYVJlY29yZGVyfENhbWVyYVNlbGVjdG9yfENhbmRsZXN0aWNrU2VyaWVzfENhbmRsZXN0aWNrU2V0fFwiICtcbiAgICAgICAgICAgICAgICBcIkNhbnZhc3xDYW52YXMzRHxDYW52YXMzREFic3RyYWN0T2JqZWN0fENhbnZhczNEQWN0aXZlSW5mb3xDYW52YXMzREJ1ZmZlcnxDYW52YXMzRENvbnRleHRBdHRyaWJ1dGVzfFwiICtcbiAgICAgICAgICAgICAgICBcIkNhbnZhczNERnJhbWVCdWZmZXJ8Q2FudmFzM0RQcm9ncmFtfENhbnZhczNEUmVuZGVyQnVmZmVyfENhbnZhczNEU2hhZGVyfENhbnZhczNEU2hhZGVyUHJlY2lzaW9uRm9ybWF0fENhbnZhczNEVGV4dHVyZXxcIiArXG4gICAgICAgICAgICAgICAgXCJDYW52YXMzRFRleHR1cmVQcm92aWRlcnxDYW52YXMzRFVuaWZvcm1Mb2NhdGlvbnxDYW52YXNHcmFkaWVudHxDYW52YXNJbWFnZURhdGF8Q2FudmFzUGl4ZWxBcnJheXxDYXRlZ29yeXxcIiArXG4gICAgICAgICAgICAgICAgXCJDYXRlZ29yeUF4aXN8Q2F0ZWdvcnlBeGlzM0R8Q2F0ZWdvcnlNb2RlbHxDYXRlZ29yeVJhbmdlfENoYW5nZUxhbmd1YWdlS2V5fENoYXJ0Vmlld3xcIiArXG4gICAgICAgICAgICAgICAgXCJDaGVja0JveHxDaGVja0JveFN0eWxlfENoZWNrRGVsZWdhdGV8Q2lyY3VsYXJHYXVnZXxDaXJjdWxhckdhdWdlU3R5bGV8Q2xlYXJCdWZmZXJzfFwiICtcbiAgICAgICAgICAgICAgICBcIkNsaXBBbmltYXRvcnxDbGlwUGxhbmV8Q2xvc2VFdmVudHxDb2xvckFuaW1hdGlvbnxDb2xvckRpYWxvZ3xDb2xvckRpYWxvZ1JlcXVlc3R8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ29sb3JHcmFkaWVudHxDb2xvckdyYWRpZW50U3RvcHxDb2xvck1hc2t8Q29sb3JPdmVybGF5fENvbG9yaXplfENvbHVtbnxcIiArXG4gICAgICAgICAgICAgICAgXCJDb2x1bW5MYXlvdXR8Q29tYm9Cb3h8Q29tYm9Cb3hTdHlsZXxDb21wYXNzfENvbXBhc3NSZWFkaW5nfENvbXBvbmVudHxDb21wb25lbnQzRHxcIiArXG4gICAgICAgICAgICAgICAgXCJDb21wdXRlQ29tbWFuZHxDb25lR2VvbWV0cnl8Q29uZU1lc2h8Q29uaWNhbEdyYWRpZW50fENvbm5lY3Rpb25zfENvbnRhY3REZXRhaWx8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ29udGFjdERldGFpbHN8Q29udGFpbmVyfENvbnRleHQyRHxDb250ZXh0M0R8Q29udGV4dE1lbnVSZXF1ZXN0fENvbnRyb2x8XCIgK1xuICAgICAgICAgICAgICAgIFwiQ29vcmRpbmF0ZUFuaW1hdGlvbnxDdWJvaWRHZW9tZXRyeXxDdWJvaWRNZXNofEN1bGxGYWNlfEN1bXVsYXRpdmVEaXJlY3Rpb258XCIgK1xuICAgICAgICAgICAgICAgIFwiQ3VzdG9tM0RJdGVtfEN1c3RvbTNETGFiZWx8Q3VzdG9tM0RWb2x1bWV8Q3VzdG9tUGFydGljbGV8Q3lsaW5kZXJHZW9tZXRyeXxDeWxpbmRlck1lc2h8XCIgK1xuICAgICAgICAgICAgICAgIFwiRGF0ZXxEYXRlVGltZUF4aXN8RGVsYXlCdXR0b258RGVsYXlCdXR0b25TdHlsZXxEZWxlZ2F0ZUNob2ljZXxEZWxlZ2F0ZUNob29zZXJ8RGVsZWdhdGVNb2RlbHxcIiArXG4gICAgICAgICAgICAgICAgXCJEZWxlZ2F0ZU1vZGVsR3JvdXB8RGVwdGhUZXN0fERlc2F0dXJhdGV8RGlhbHxEaWFsU3R5bGV8RGlhbG9nfERpYWxvZ0J1dHRvbkJveHxEaWZmdXNlTWFwTWF0ZXJpYWx8XCIgK1xuICAgICAgICAgICAgICAgIFwiRGlmZnVzZVNwZWN1bGFyTWFwTWF0ZXJpYWx8RGlmZnVzZVNwZWN1bGFyTWF0ZXJpYWx8RGlyZWN0aW9ufERpcmVjdGlvbmFsQmx1cnxEaXJlY3Rpb25hbExpZ2h0fERpc3BhdGNoQ29tcHV0ZXxcIiArXG4gICAgICAgICAgICAgICAgXCJEaXNwbGFjZXxEaXN0YW5jZVJlYWRpbmd8RGlzdGFuY2VTZW5zb3J8RGl0aGVyaW5nfERvdWJsZVZhbGlkYXRvcnxEcmFnfERyYWdFdmVudHxEcmFnSGFuZGxlcnxEcmF3ZXJ8RHJvcEFyZWF8XCIgK1xuICAgICAgICAgICAgICAgIFwiRHJvcFNoYWRvd3xEd21GZWF0dXJlc3xEeW5hbWljUGFyYW1ldGVyfEVkaXRvcmlhbE1vZGVsfEVmZmVjdHxFbGxpcHNlU2hhcGV8RW1pdHRlcnxFbnRlcktleXxFbnRlcktleUFjdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJFbnRpdHl8RW50aXR5TG9hZGVyfEVudmlyb25tZW50TGlnaHR8RXZlbnRDb25uZWN0aW9ufEV2ZW50UG9pbnR8RXZlbnRUb3VjaFBvaW50fEV4Y2x1c2l2ZUdyb3VwfEV4dGVuZGVkQXR0cmlidXRlc3xcIiArXG4gICAgICAgICAgICAgICAgXCJFeHRydWRlZFRleHRHZW9tZXRyeXxFeHRydWRlZFRleHRNZXNofEZhc3RCbHVyfEZpbGVEaWFsb2d8RmlsZURpYWxvZ1JlcXVlc3R8RmlsbGVyS2V5fEZpbHRlcktleXxGaW5hbFN0YXRlfFwiICtcbiAgICAgICAgICAgICAgICBcIkZpcnN0UGVyc29uQ2FtZXJhQ29udHJvbGxlcnxGbGlja2FibGV8RmxpcGFibGV8Rmxvd3xGb2N1c1Njb3BlfEZvbGRlckxpc3RNb2RlbHxGb250RGlhbG9nfEZvbnRMb2FkZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiRm9udE1ldHJpY3N8Rm9ybVZhbGlkYXRpb25NZXNzYWdlUmVxdWVzdHxGb3J3YXJkUmVuZGVyZXJ8RnJhbWV8RnJhbWVBY3Rpb258RnJhbWVHcmFwaE5vZGV8RnJpY3Rpb258XCIgK1xuICAgICAgICAgICAgICAgIFwiRnJvbnRGYWNlfEZydXN0dW1DdWxsaW5nfEZ1bGxTY3JlZW5SZXF1ZXN0fEdMU3RhdGVEdW1wRXh0fEdhbW1hQWRqdXN0fEdhdWdlfEdhdWdlU3R5bGV8R2F1c3NpYW5CbHVyfFwiICtcbiAgICAgICAgICAgICAgICBcIkdlb2NvZGVNb2RlbHxHZW9tZXRyeXxHZW9tZXRyeVJlbmRlcmVyfEdlc3R1cmVFdmVudHxHbG93fEdvb2NoTWF0ZXJpYWx8R3JhZGllbnR8R3JhZGllbnRTdG9wfEdyYXBoaWNzQXBpRmlsdGVyfFwiICtcbiAgICAgICAgICAgICAgICBcIkdyYXBoaWNzSW5mb3xHcmF2aXR5fEdyaWR8R3JpZExheW91dHxHcmlkTWVzaHxHcmlkVmlld3xHcm91cEJveHxHcm91cEdvYWx8R3lyb3Njb3BlfEd5cm9zY29wZVJlYWRpbmd8SEJhck1vZGVsTWFwcGVyfFwiICtcbiAgICAgICAgICAgICAgICBcIkhCb3hQbG90TW9kZWxNYXBwZXJ8SENhbmRsZXN0aWNrTW9kZWxNYXBwZXJ8SFBpZU1vZGVsTWFwcGVyfEhYWU1vZGVsTWFwcGVyfEhhbmRsZXJQb2ludHxIYW5kd3JpdGluZ0lucHV0UGFuZWx8XCIgK1xuICAgICAgICAgICAgICAgIFwiSGFuZHdyaXRpbmdNb2RlS2V5fEhlaWdodE1hcFN1cmZhY2VEYXRhUHJveHl8SGlkZUtleWJvYXJkS2V5fEhpc3RvcnlTdGF0ZXxIb2xzdGVyUmVhZGluZ3xIb2xzdGVyU2Vuc29yfEhvcml6b250YWxCYXJTZXJpZXN8XCIgK1xuICAgICAgICAgICAgICAgIFwifEhvcml6b250YWxQZXJjZW50QmFyU2VyaWVzfEhvcml6b250YWxTdGFja2VkQmFyU2VyaWVzfEhvdmVySGFuZGxlcnxIdWVTYXR1cmF0aW9ufEh1bWlkaXR5UmVhZGluZ3xIdW1pZGl0eVNlbnNvcnxcIiArXG4gICAgICAgICAgICAgICAgXCJJUlByb3hpbWl0eVJlYWRpbmd8SVJQcm94aW1pdHlTZW5zb3J8SWNvbnxJbWFnZXxJbWFnZU1vZGVsfEltYWdlUGFydGljbGV8SW5uZXJTaGFkb3d8SW5wdXRDaG9yZHxJbnB1dENvbnRleHR8SW5wdXRFbmdpbmV8XCIgK1xuICAgICAgICAgICAgICAgIFwiSW5wdXRIYW5kbGVyM0R8SW5wdXRNZXRob2R8SW5wdXRNb2RlS2V5fElucHV0UGFuZWx8SW5wdXRTZXF1ZW5jZXxJbnB1dFNldHRpbmdzfEluc3RhbnRpYXRvcnxJbnRWYWxpZGF0b3J8SW52b2tlZFNlcnZpY2VzfFwiICtcbiAgICAgICAgICAgICAgICBcIkl0ZW18SXRlbURlbGVnYXRlfEl0ZW1HcmFiUmVzdWx0fEl0ZW1Nb2RlbEJhckRhdGFQcm94eXxJdGVtTW9kZWxTY2F0dGVyRGF0YVByb3h5fEl0ZW1Nb2RlbFN1cmZhY2VEYXRhUHJveHl8SXRlbVBhcnRpY2xlfFwiICtcbiAgICAgICAgICAgICAgICBcIkl0ZW1TZWxlY3Rpb25Nb2RlbHxJdmlBcHBsaWNhdGlvbnxJdmlTdXJmYWNlfEphdmFTY3JpcHREaWFsb2dSZXF1ZXN0fEpvaW50fEp1bXBMaXN0fEp1bXBMaXN0Q2F0ZWdvcnl8SnVtcExpc3REZXN0aW5hdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJKdW1wTGlzdExpbmt8SnVtcExpc3RTZXBhcmF0b3J8S2V5fEtleUV2ZW50fEtleUljb258S2V5TmF2aWdhdGlvbnxLZXlQYW5lbHxLZXlib2FyZENvbHVtbnxLZXlib2FyZERldmljZXxLZXlib2FyZEhhbmRsZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiS2V5Ym9hcmRMYXlvdXR8S2V5Ym9hcmRMYXlvdXRMb2FkZXJ8S2V5Ym9hcmRSb3d8S2V5Ym9hcmRTdHlsZXxLZXlmcmFtZUFuaW1hdGlvbnxLZXlzfExhYmVsfExheWVyfExheWVyRmlsdGVyfExheW91dHxcIiArXG4gICAgICAgICAgICAgICAgXCJMYXlvdXRNaXJyb3Jpbmd8TGVnZW5kfExlcnBCbGVuZHxMZXZlbEFkanVzdHxMZXZlbE9mRGV0YWlsfExldmVsT2ZEZXRhaWxCb3VuZGluZ1NwaGVyZXxMZXZlbE9mRGV0YWlsTG9hZGVyfFwiICtcbiAgICAgICAgICAgICAgICBcIkxldmVsT2ZEZXRhaWxTd2l0Y2h8TGlkUmVhZGluZ3xMaWRTZW5zb3J8TGlnaHR8TGlnaHQzRHxMaWdodFJlYWRpbmd8TGlnaHRTZW5zb3J8TGluZVNlcmllc3xMaW5lU2hhcGV8TGluZVdpZHRofFwiICtcbiAgICAgICAgICAgICAgICBcIkxpbmVhckdyYWRpZW50fExpc3RFbGVtZW50fExpc3RNb2RlbHxMaXN0Vmlld3xMb2FkZXJ8TG9jYWxlfExvY2F0aW9ufExvZ1ZhbHVlQXhpc3xMb2dWYWx1ZUF4aXMzREZvcm1hdHRlcnxMb2dnaW5nQ2F0ZWdvcnl8XCIgK1xuICAgICAgICAgICAgICAgIFwiTG9naWNhbERldmljZXxNYWduZXRvbWV0ZXJ8TWFnbmV0b21ldGVyUmVhZGluZ3xNYXB8TWFwQ2lyY2xlfE1hcENpcmNsZU9iamVjdHxNYXBDb3B5cmlnaHROb3RpY2V8TWFwR2VzdHVyZUFyZWF8TWFwSWNvbk9iamVjdHxcIiArXG4gICAgICAgICAgICAgICAgXCJNYXBJdGVtR3JvdXB8TWFwSXRlbVZpZXd8TWFwT2JqZWN0Vmlld3xNYXBQYXJhbWV0ZXJ8TWFwUGluY2hFdmVudHxNYXBQb2x5Z29ufE1hcFBvbHlnb25PYmplY3R8TWFwUG9seWxpbmV8TWFwUG9seWxpbmVPYmplY3R8XCIgK1xuICAgICAgICAgICAgICAgIFwiTWFwUXVpY2tJdGVtfE1hcFJlY3RhbmdsZXxNYXBSb3V0ZXxNYXBSb3V0ZU9iamVjdHxNYXBUeXBlfE1hcmdpbnN8TWFza1NoYXBlfE1hc2tlZEJsdXJ8TWF0ZXJpYWx8TWF0cml4NHg0fE1lZGlhUGxheWVyfFwiICtcbiAgICAgICAgICAgICAgICBcIk1lbW9yeUJhcnJpZXJ8TWVudXxNZW51QmFyfE1lbnVCYXJJdGVtfE1lbnVCYXJTdHlsZXxNZW51SXRlbXxNZW51U2VwYXJhdG9yfE1lbnVTdHlsZXxNZXNofE1lc3NhZ2VEaWFsb2d8TW9kZUtleXxNb3JwaFRhcmdldHxcIiArXG4gICAgICAgICAgICAgICAgXCJNb3JwaGluZ0FuaW1hdGlvbnxNb3VzZUFyZWF8TW91c2VEZXZpY2V8TW91c2VFdmVudHxNb3VzZUhhbmRsZXJ8TXVsdGlQb2ludEhhbmRsZXJ8TXVsdGlQb2ludFRvdWNoQXJlYXxNdWx0aVNhbXBsZUFudGlBbGlhc2luZ3xcIiArXG4gICAgICAgICAgICAgICAgXCJOYXZpZ2F0b3J8TmRlZkZpbHRlcnxOZGVmTWltZVJlY29yZHxOZGVmUmVjb3JkfE5kZWZUZXh0UmVjb3JkfE5kZWZVcmlSZWNvcmR8TmVhckZpZWxkfE5vRGVwdGhNYXNrfE5vRHJhd3xOb2RlfE5vZGVJbnN0YW50aWF0b3J8XCIgK1xuICAgICAgICAgICAgICAgIFwiTm9ybWFsRGlmZnVzZU1hcEFscGhhTWF0ZXJpYWx8Tm9ybWFsRGlmZnVzZU1hcE1hdGVyaWFsfE5vcm1hbERpZmZ1c2VTcGVjdWxhck1hcE1hdGVyaWFsfE51bWJlcnxOdW1iZXJBbmltYXRpb258TnVtYmVyS2V5fE9iamVjdDNEfFwiICtcbiAgICAgICAgICAgICAgICBcIk9iamVjdE1vZGVsfE9iamVjdFBpY2tlcnxPcGFjaXR5QW5pbWF0b3J8T3BhY2l0eU1hc2t8T3BlbkdMSW5mb3xPcmJpdENhbWVyYUNvbnRyb2xsZXJ8T3JpZW50YXRpb25SZWFkaW5nfE9yaWVudGF0aW9uU2Vuc29yfE92ZXJsYXl8XCIgK1xuICAgICAgICAgICAgICAgIFwiUGFja2FnZXxQYWdlfFBhZ2VJbmRpY2F0b3J8UGFuZXxQYXJhbGxlbEFuaW1hdGlvbnxQYXJhbWV0ZXJ8UGFyZW50QW5pbWF0aW9ufFBhcmVudENoYW5nZXxQYXJ0aWNsZXxQYXJ0aWNsZUdyb3VwfFBhcnRpY2xlUGFpbnRlcnxcIiArXG4gICAgICAgICAgICAgICAgXCJQYXJ0aWNsZVN5c3RlbXxQYXRofFBhdGhBbmdsZUFyY3xQYXRoQW5pbWF0aW9ufFBhdGhBcmN8UGF0aEF0dHJpYnV0ZXxQYXRoQ3ViaWN8UGF0aEN1cnZlfFBhdGhFbGVtZW50fFBhdGhJbnRlcnBvbGF0b3J8UGF0aExpbmV8XCIgK1xuICAgICAgICAgICAgICAgIFwiUGF0aE1vdmV8UGF0aFBlcmNlbnR8UGF0aFF1YWR8UGF0aFN2Z3xQYXRoVmlld3xQYXVzZUFuaW1hdGlvbnxQZXJWZXJ0ZXhDb2xvck1hdGVyaWFsfFBlcmNlbnRCYXJTZXJpZXN8UGhvbmdBbHBoYU1hdGVyaWFsfFwiICtcbiAgICAgICAgICAgICAgICBcIlBob25nTWF0ZXJpYWx8UGlja0V2ZW50fFBpY2tMaW5lRXZlbnR8UGlja1BvaW50RXZlbnR8UGlja1RyaWFuZ2xlRXZlbnR8UGlja2luZ1NldHRpbmdzfFBpY3R1cmV8UGllTWVudXxQaWVNZW51U3R5bGV8UGllU2VyaWVzfFwiICtcbiAgICAgICAgICAgICAgICBcIlBpZVNsaWNlfFBpbmNoQXJlYXxQaW5jaEV2ZW50fFBpbmNoSGFuZGxlcnxQbGFjZXxQbGFjZUF0dHJpYnV0ZXxQbGFjZVNlYXJjaE1vZGVsfFBsYWNlU2VhcmNoU3VnZ2VzdGlvbk1vZGVsfFBsYW5lR2VvbWV0cnl8XCIgK1xuICAgICAgICAgICAgICAgIFwiUGxhbmVNZXNofFBsYXlWYXJpYXRpb258UGxheWxpc3R8UGxheWxpc3RJdGVtfFBsdWdpbnxQbHVnaW5QYXJhbWV0ZXJ8UG9pbnREaXJlY3Rpb258UG9pbnRIYW5kbGVyfFBvaW50TGlnaHR8UG9pbnRTaXplfFwiICtcbiAgICAgICAgICAgICAgICBcIlBvaW50ZXJEZXZpY2V8UG9pbnRlckRldmljZUhhbmRsZXJ8UG9pbnRlckV2ZW50fFBvaW50ZXJIYW5kbGVyfFBvbGFyQ2hhcnRWaWV3fFBvbHlnb25PZmZzZXR8UG9wdXB8UG9zaXRpb258UG9zaXRpb25Tb3VyY2V8XCIgK1xuICAgICAgICAgICAgICAgIFwiUG9zaXRpb25lcnxQcmVzc3VyZVJlYWRpbmd8UHJlc3N1cmVTZW5zb3J8UHJvZHVjdHxQcm9ncmVzc0JhcnxQcm9ncmVzc0JhclN0eWxlfFByb3BlcnR5QWN0aW9ufFByb3BlcnR5QW5pbWF0aW9ufFByb3BlcnR5Q2hhbmdlc3xcIiArXG4gICAgICAgICAgICAgICAgXCJQcm94aW1pdHlGaWx0ZXJ8UHJveGltaXR5UmVhZGluZ3xQcm94aW1pdHlTZW5zb3J8UUFic3RyYWN0U3RhdGV8UUFic3RyYWN0VHJhbnNpdGlvbnxRU2lnbmFsVHJhbnNpdGlvbnxcIiArXG4gICAgICAgICAgICAgICAgXCJRVmlydHVhbEtleWJvYXJkU2VsZWN0aW9uTGlzdE1vZGVsfFF0fFF0TXVsdGltZWRpYXxRdE9iamVjdHxRdFBvc2l0aW9uaW5nfFF1YXRlcm5pb25BbmltYXRpb258UXVvdGFSZXF1ZXN0fFJhZGlhbEJsdXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiUmFkaWFsR3JhZGllbnR8UmFkaW98UmFkaW9CdXR0b258UmFkaW9CdXR0b25TdHlsZXxSYWRpb0RhdGF8UmFkaW9EZWxlZ2F0ZXxSYW5nZVNsaWRlcnxSYXRpbmdzfFJheUNhc3RlcnxSZWN0YW5nbGV8XCIgK1xuICAgICAgICAgICAgICAgIFwiUmVjdGFuZ2xlU2hhcGV8UmVjdGFuZ3VsYXJHbG93fFJlY3Vyc2l2ZUJsdXJ8UmVnRXhwVmFsaWRhdG9yfFJlZ2lzdGVyUHJvdG9jb2xIYW5kbGVyUmVxdWVzdHxSZW5kZXJDYXB0dXJlfFwiICtcbiAgICAgICAgICAgICAgICBcIlJlbmRlckNhcHR1cmVSZXBseXxSZW5kZXJQYXNzfFJlbmRlclBhc3NGaWx0ZXJ8UmVuZGVyU2V0dGluZ3N8UmVuZGVyU3RhdGV8UmVuZGVyU3RhdGVTZXR8UmVuZGVyU3VyZmFjZVNlbGVjdG9yfFwiICtcbiAgICAgICAgICAgICAgICBcIlJlbmRlclRhcmdldHxSZW5kZXJUYXJnZXRPdXRwdXR8UmVuZGVyVGFyZ2V0U2VsZWN0b3J8UmVwZWF0ZXJ8UmV2aWV3TW9kZWx8Um90YXRpb258Um90YXRpb25BbmltYXRpb258Um90YXRpb25BbmltYXRvcnxcIiArXG4gICAgICAgICAgICAgICAgXCJSb3RhdGlvblJlYWRpbmd8Um90YXRpb25TZW5zb3J8Um91bmRCdXR0b258Um91dGV8Um91dGVMZWd8Um91dGVNYW5ldXZlcnxSb3V0ZU1vZGVsfFJvdXRlUXVlcnl8Um91dGVTZWdtZW50fFJvd3xcIiArXG4gICAgICAgICAgICAgICAgXCJSb3dMYXlvdXR8U2NhbGV8U2NhbGVBbmltYXRvcnxTY2F0dGVyM0R8U2NhdHRlcjNEU2VyaWVzfFNjYXR0ZXJEYXRhUHJveHl8U2NhdHRlclNlcmllc3xTY2VuZTJEfFNjZW5lM0R8U2NlbmVMb2FkZXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiU2Npc3NvclRlc3R8U2NyZWVufFNjcmVlblJheUNhc3RlcnxTY3JpcHRBY3Rpb258U2Nyb2xsQmFyfFNjcm9sbEluZGljYXRvcnxTY3JvbGxWaWV3fFNjcm9sbFZpZXdTdHlsZXxTY3htbFN0YXRlTWFjaGluZXxcIiArXG4gICAgICAgICAgICAgICAgXCJTZWFtbGVzc0N1YmVtYXB8U2VsZWN0aW9uTGlzdEl0ZW18U2Vuc29yfFNlbnNvckdlc3R1cmV8U2Vuc29yR2xvYmFsfFNlbnNvclJlYWRpbmd8U2VxdWVudGlhbEFuaW1hdGlvbnxTZXR0aW5nc3xcIiArXG4gICAgICAgICAgICAgICAgXCJTZXR0aW5nc1N0b3JlfFNoYWRlckVmZmVjdHxTaGFkZXJFZmZlY3RTb3VyY2V8U2hhZGVyUHJvZ3JhbXxTaGFkZXJQcm9ncmFtQnVpbGRlcnxTaGFwZXxTaGVsbFN1cmZhY2V8U2hlbGxTdXJmYWNlSXRlbXxcIiArXG4gICAgICAgICAgICAgICAgXCJTaGlmdEhhbmRsZXJ8U2hpZnRLZXl8U2hvcnRjdXR8U2lnbmFsU3B5fFNpZ25hbFRyYW5zaXRpb258U2luZ2xlUG9pbnRIYW5kbGVyfFNrZWxldG9ufFNrZWxldG9uTG9hZGVyfFNsaWRlcnxTbGlkZXJTdHlsZXxcIiArXG4gICAgICAgICAgICAgICAgXCJTbW9vdGhlZEFuaW1hdGlvbnxTb3J0UG9saWN5fFNvdW5kfFNvdW5kRWZmZWN0fFNvdW5kSW5zdGFuY2V8U3BhY2VLZXl8U3BoZXJlR2VvbWV0cnl8U3BoZXJlTWVzaHxTcGluQm94fFNwaW5Cb3hTdHlsZXxcIiArXG4gICAgICAgICAgICAgICAgXCJTcGxpbmVTZXJpZXN8U3BsaXRWaWV3fFNwb3RMaWdodHxTcHJpbmdBbmltYXRpb258U3ByaXRlfFNwcml0ZUdvYWx8U3ByaXRlU2VxdWVuY2V8U3RhY2t8U3RhY2tMYXlvdXR8U3RhY2tWaWV3fFwiICtcbiAgICAgICAgICAgICAgICBcIlN0YWNrVmlld0RlbGVnYXRlfFN0YWNrZWRCYXJTZXJpZXN8U3RhdGV8U3RhdGVDaGFuZ2VTY3JpcHR8U3RhdGVHcm91cHxTdGF0ZU1hY2hpbmV8U3RhdGVNYWNoaW5lTG9hZGVyfFN0YXR1c0JhcnxcIiArXG4gICAgICAgICAgICAgICAgXCJTdGF0dXNCYXJTdHlsZXxTdGF0dXNJbmRpY2F0b3J8U3RhdHVzSW5kaWNhdG9yU3R5bGV8U3RlbmNpbE1hc2t8U3RlbmNpbE9wZXJhdGlvbnxTdGVuY2lsT3BlcmF0aW9uQXJndW1lbnRzfFN0ZW5jaWxUZXN0fFwiICtcbiAgICAgICAgICAgICAgICBcIlN0ZW5jaWxUZXN0QXJndW1lbnRzfFN0b3JlfFN0cmluZ3xTdXBwbGllcnxTdXJmYWNlM0R8U3VyZmFjZTNEU2VyaWVzfFN1cmZhY2VEYXRhUHJveHl8U3dpcGVEZWxlZ2F0ZXxTd2lwZVZpZXd8U3dpdGNofFwiICtcbiAgICAgICAgICAgICAgICBcIlN3aXRjaERlbGVnYXRlfFN3aXRjaFN0eWxlfFN5bWJvbE1vZGVLZXl8U3lzdGVtUGFsZXR0ZXxUYWJ8VGFiQmFyfFRhYkJ1dHRvbnxUYWJWaWV3fFRhYlZpZXdTdHlsZXxUYWJsZVZpZXd8VGFibGVWaWV3Q29sdW1ufFwiICtcbiAgICAgICAgICAgICAgICBcIlRhYmxlVmlld1N0eWxlfFRhcEhhbmRsZXJ8VGFwUmVhZGluZ3xUYXBTZW5zb3J8VGFyZ2V0RGlyZWN0aW9ufFRhc2tiYXJCdXR0b258VGVjaG5pcXVlfFRlY2huaXF1ZUZpbHRlcnxUZXN0Q2FzZXxUZXh0fFRleHRBcmVhfFwiICtcbiAgICAgICAgICAgICAgICBcIlRleHRBcmVhU3R5bGV8VGV4dEVkaXR8VGV4dEZpZWxkfFRleHRGaWVsZFN0eWxlfFRleHRJbnB1dHxUZXh0TWV0cmljc3xUZXh0dXJlSW1hZ2V8VGV4dHVyZUltYWdlRmFjdG9yeXxUaGVtZTNEfFRoZW1lQ29sb3J8XCIgK1xuICAgICAgICAgICAgICAgIFwiVGhyZXNob2xkTWFza3xUaHVtYm5haWxUb29sQmFyfFRodW1ibmFpbFRvb2xCdXR0b258VGlsdFJlYWRpbmd8VGlsdFNlbnNvcnxUaW1lb3V0VHJhbnNpdGlvbnxUaW1lcnxUb2dnbGVCdXR0b258XCIgK1xuICAgICAgICAgICAgICAgIFwiVG9nZ2xlQnV0dG9uU3R5bGV8VG9vbEJhcnxUb29sQmFyU3R5bGV8VG9vbEJ1dHRvbnxUb29sU2VwYXJhdG9yfFRvb2xUaXB8VG9yY2h8VG9ydXNHZW9tZXRyeXxUb3J1c01lc2h8VG91Y2hFdmVudFNlcXVlbmNlfFwiICtcbiAgICAgICAgICAgICAgICBcIlRvdWNoSW5wdXRIYW5kbGVyM0R8VG91Y2hQb2ludHxUcmFjZXxUcmFjZUNhbnZhc3xUcmFjZUlucHV0QXJlYXxUcmFjZUlucHV0S2V5fFRyYWNlSW5wdXRLZXlQYW5lbHxUcmFpbEVtaXR0ZXJ8VHJhbnNhY3Rpb258XCIgK1xuICAgICAgICAgICAgICAgIFwiVHJhbnNmb3JtfFRyYW5zaXRpb258VHJhbnNsYXRlfFRyZWVWaWV3fFRyZWVWaWV3U3R5bGV8VHVtYmxlcnxUdW1ibGVyQ29sdW1ufFR1bWJsZXJTdHlsZXxUdXJidWxlbmNlfFVuaWZvcm1BbmltYXRvcnxVc2VyfFwiICtcbiAgICAgICAgICAgICAgICBcIlZCYXJNb2RlbE1hcHBlcnxWQm94UGxvdE1vZGVsTWFwcGVyfFZDYW5kbGVzdGlja01vZGVsTWFwcGVyfFZQaWVNb2RlbE1hcHBlcnxWWFlNb2RlbE1hcHBlcnxWYWx1ZUF4aXN8VmFsdWVBeGlzM0R8XCIgK1xuICAgICAgICAgICAgICAgIFwiVmFsdWVBeGlzM0RGb3JtYXR0ZXJ8VmVjdG9yM2RBbmltYXRpb258VmVydGV4QmxlbmRBbmltYXRpb258VmlkZW98VmlkZW9PdXRwdXR8Vmlld1RyYW5zaXRpb258Vmlld3BvcnR8XCIgK1xuICAgICAgICAgICAgICAgIFwiVmlydHVhbEtleWJvYXJkU2V0dGluZ3N8V2FuZGVyfFdhdmVmcm9udE1lc2h8V2F5bGFuZENsaWVudHxXYXlsYW5kQ29tcG9zaXRvcnxXYXlsYW5kSGFyZHdhcmVMYXllcnxcIiArXG4gICAgICAgICAgICAgICAgXCJXYXlsYW5kT3V0cHV0fFdheWxhbmRRdWlja0l0ZW18V2F5bGFuZFNlYXR8V2F5bGFuZFN1cmZhY2V8V2F5bGFuZFZpZXd8V2F5cG9pbnR8XCIgK1xuICAgICAgICAgICAgICAgIFwiV2ViQ2hhbm5lbHxXZWJFbmdpbmV8V2ViRW5naW5lQWN0aW9ufFdlYkVuZ2luZUNlcnRpZmljYXRlRXJyb3J8V2ViRW5naW5lRG93bmxvYWRJdGVtfFdlYkVuZ2luZUhpc3Rvcnl8XCIgK1xuICAgICAgICAgICAgICAgIFwiV2ViRW5naW5lSGlzdG9yeUxpc3RNb2RlbHxXZWJFbmdpbmVMb2FkUmVxdWVzdHxXZWJFbmdpbmVOYXZpZ2F0aW9uUmVxdWVzdHxXZWJFbmdpbmVOZXdWaWV3UmVxdWVzdHxXZWJFbmdpbmVQcm9maWxlfFdlYkVuZ2luZVNjcmlwdHxcIiArXG4gICAgICAgICAgICAgICAgXCJXZWJFbmdpbmVTZXR0aW5nc3xXZWJFbmdpbmVWaWV3fFdlYlNvY2tldHxXZWJTb2NrZXRTZXJ2ZXJ8V2ViVmlld3xXZWJWaWV3TG9hZFJlcXVlc3R8XCIgK1xuICAgICAgICAgICAgICAgIFwiV2hlZWxFdmVudHxXaW5kb3d8V2xTaGVsbHxXbFNoZWxsU3VyZmFjZXxXb3JrZXJTY3JpcHR8WEFuaW1hdG9yfFwiICtcbiAgICAgICAgICAgICAgICBcIlhZUG9pbnR8WFlTZXJpZXN8WGRnRGVjb3JhdGlvbk1hbmFnZXJWMXxYZGdQb3B1cHxYZGdQb3B1cFY1fFhkZ1BvcHVwVjZ8XCIgK1xuICAgICAgICAgICAgICAgIFwiWGRnU2hlbGx8WGRnU2hlbGxWNXxYZGdTaGVsbFY2fFhkZ1N1cmZhY2V8WGRnU3VyZmFjZVY1fFhkZ1N1cmZhY2VWNnxcIiArXG4gICAgICAgICAgICAgICAgXCJYZGdUb3BsZXZlbHxYZGdUb3BsZXZlbFY2fFhtbExpc3RNb2RlbHxYbWxSb2xlfFlBbmltYXRvcnxab29tQmx1clwiLFxuICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGVcIjpcbiAgICAgICAgICAgICAgICBcImNvbnN0fGxldHx2YXJ8ZnVuY3Rpb258XCIgKyAvLyBqc1xuICAgICAgICAgICAgICAgIFwicHJvcGVydHl8XCIsIC8vIHFtbFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOlxuICAgICAgICAgICAgICAgIFwibnVsbHxJbmZpbml0eXxOYU58dW5kZWZpbmVkXCIsXG4gICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICBcInByaW50fGNvbnNvbGVcXFxcLmxvZ1wiLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCI6IFwidHJ1ZXxmYWxzZVwiXG4gICAgICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgICAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICAgICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxiXFxcXHcrXFxcXGJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcInN0cmluZ1wiIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcKD86eFswLTlhLWZBLUZdezJ9fHVbMC05YS1mQS1GXXs0fXxbXCJcXFxcXFwvYmZucnRdKS9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgIG9vcC5pbmhlcml0cyhRbWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGV4cG9ydHMuUW1sSGlnaGxpZ2h0UnVsZXMgPSBRbWxIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==