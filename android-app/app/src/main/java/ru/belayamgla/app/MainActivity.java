package ru.belayamgla.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.WindowInsets;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.ServiceWorkerController;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String HOME_URL = "https://belaya-mgla-sova58.github.io/";
    private static final String SITE_HOST = "belaya-mgla-sova58.github.io";
    private static final int BAR_BG = Color.rgb(3, 20, 38);
    private static final int NAV_NORMAL = Color.rgb(142, 169, 196);
    private static final int NAV_ACTIVE = Color.rgb(199, 232, 255);
    private static final int NAV_ACTIVE_BG = Color.rgb(15, 51, 78);

    private static final String PERFORMANCE_JS =
            "(function(){" +
            "if(!document.getElementById('belaya-mgla-app-performance')){" +
            "var s=document.createElement('style');s.id='belaya-mgla-app-performance';" +
            "s.textContent='html{scroll-behavior:auto!important}' +" +
            "'*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}' +" +
            "'.reveal,.in-view{opacity:1!important;transform:none!important}' +" +
            "'.mobile-bottom-v424{display:none!important}' +" +
            "'[style*=\\\"background-attachment:fixed\\\"]{background-attachment:scroll!important}' +" +
            "'body{background-attachment:scroll!important}';" +
            "(document.head||document.documentElement).appendChild(s);}" +
            "var imgs=document.images;for(var i=0;i<imgs.length;i++){imgs[i].decoding='async';if(i>2&&!imgs[i].hasAttribute('loading'))imgs[i].loading='lazy';}" +
            "})();";

    private static final String PREFETCH_JS =
            "(function(){if(window.__bmPrefetchDone)return;window.__bmPrefetchDone=1;" +
            "var seen={},u=[];document.querySelectorAll('a[href]').forEach(function(a){try{var x=new URL(a.href,location.href);if(x.origin===location.origin&&/\\.html$/.test(x.pathname)&&!seen[x.href]){seen[x.href]=1;u.push(x.href);}}catch(e){}});" +
            "u=u.slice(0,8);var i=0;function n(){if(i>=u.length)return;fetch(u[i++],{credentials:'same-origin',cache:'force-cache'}).catch(function(){}).finally(function(){setTimeout(n,250);});}setTimeout(n,1000);})();";

    private static final String FIND_ACTIVE_NAV_JS =
            "(function(){" +
            "var n=document.querySelector('.mobile-bottom-v424 a.active');" +
            "if(!n){var a=document.querySelectorAll('.mobile-bottom-v424 a');for(var i=0;i<a.length;i++){try{if(new URL(a[i].href,location.href).pathname===location.pathname){n=a[i];break;}}catch(e){}}}" +
            "return n&&n.dataset?n.dataset.v424Nav||'':'';" +
            "})();";

    private WebView webView;
    private ProgressBar progressBar;
    private LinearLayout bottomBar;
    private int bottomInsetPx = 0;
    private final Map<String, LinearLayout> navItems = new HashMap<>();
    private String activeNav = "home";
    private boolean offlineShown = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(BAR_BG);
        getWindow().setNavigationBarColor(BAR_BG);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(BAR_BG);

        FrameLayout webFrame = new FrameLayout(this);
        webView = new WebView(this);
        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setMax(100);

        webView.setBackgroundColor(BAR_BG);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            webView.setRendererPriorityPolicy(WebView.RENDERER_PRIORITY_BOUND, true);
        }

        webFrame.addView(webView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));
        FrameLayout.LayoutParams progressParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT, dp(2));
        webFrame.addView(progressBar, progressParams);

        root.addView(webFrame, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f));
        bottomBar = createBottomBar();
        root.addView(bottomBar, createBottomBarLayoutParams());
        setContentView(root);
        applyWindowInsets(root);

        configureWebView();
        setActiveNav("home");

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            Uri deepLink = getIntent() != null ? getIntent().getData() : null;
            webView.loadUrl(deepLink != null && SITE_HOST.equalsIgnoreCase(deepLink.getHost())
                    ? deepLink.toString() : HOME_URL);
        }
    }

    private LinearLayout.LayoutParams createBottomBarLayoutParams() {
        return new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, dp(70) + bottomInsetPx);
    }

    private void applyWindowInsets(View root) {
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            int bottom = 0;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                bottom = insets.getInsets(WindowInsets.Type.navigationBars()).bottom;
            } else {
                bottom = insets.getSystemWindowInsetBottom();
            }
            updateBottomBarInset(bottom);
            return insets;
        });
        root.requestApplyInsets();
    }

    private void updateBottomBarInset(int bottom) {
        if (bottom < 0) bottom = 0;
        if (bottomInsetPx == bottom && bottomBar.getLayoutParams() != null) return;
        bottomInsetPx = bottom;
        bottomBar.setPadding(dp(4), dp(5), dp(4), dp(5) + bottomInsetPx);
        ViewGroup.LayoutParams lp = bottomBar.getLayoutParams();
        if (lp == null) {
            lp = createBottomBarLayoutParams();
        } else {
            lp.height = dp(70) + bottomInsetPx;
        }
        bottomBar.setLayoutParams(lp);
        bottomBar.setClipToPadding(false);
    }

    private LinearLayout createBottomBar() {
        LinearLayout bar = new LinearLayout(this);
        bar.setOrientation(LinearLayout.HORIZONTAL);
        bar.setGravity(Gravity.CENTER);
        bar.setPadding(dp(4), dp(5), dp(4), dp(5));
        bar.setBackgroundColor(BAR_BG);
        bar.setElevation(dp(10));

        addNavItem(bar, "home", "Главная", R.drawable.ic_home, "index.html");
        addNavItem(bar, "events", "События", R.drawable.ic_events, "events.html");
        addNavItem(bar, "heroes", "Герои", R.drawable.ic_heroes, "heroes.html");
        addNavItem(bar, "calc", "Калькулятор", R.drawable.ic_calculator, "fire-furnace-calculator.html");
        addNavItem(bar, "knowledge", "База знаний", R.drawable.ic_knowledge, "other.html");
        return bar;
    }

    private void addNavItem(LinearLayout bar, String key, String label, int iconRes, String page) {
        LinearLayout item = new LinearLayout(this);
        item.setOrientation(LinearLayout.VERTICAL);
        item.setGravity(Gravity.CENTER);
        item.setPadding(dp(2), dp(5), dp(2), dp(3));
        item.setClickable(true);
        item.setFocusable(true);
        item.setContentDescription(label);

        ImageView icon = new ImageView(this);
        icon.setImageResource(iconRes);
        icon.setTag("icon");
        item.addView(icon, new LinearLayout.LayoutParams(dp(25), dp(25)));

        TextView text = new TextView(this);
        text.setText(label);
        text.setTextSize(label.length() > 10 ? 9 : 10);
        text.setGravity(Gravity.CENTER);
        text.setSingleLine(true);
        text.setTag("text");
        LinearLayout.LayoutParams textParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        textParams.topMargin = dp(2);
        item.addView(text, textParams);

        item.setOnClickListener(v -> {
            setActiveNav(key);
            String target = HOME_URL + page;
            String current = webView.getUrl();
            if (current == null || !samePath(current, target)) webView.loadUrl(target);
            else webView.scrollTo(0, 0);
        });

        navItems.put(key, item);
        bar.addView(item, new LinearLayout.LayoutParams(0,
                LinearLayout.LayoutParams.MATCH_PARENT, 1f));
    }

    private void setActiveNav(String key) {
        if (key == null || !navItems.containsKey(key)) return;
        activeNav = key;
        for (Map.Entry<String, LinearLayout> e : navItems.entrySet()) {
            boolean selected = e.getKey().equals(key);
            LinearLayout item = e.getValue();
            ImageView icon = item.findViewWithTag("icon");
            TextView text = item.findViewWithTag("text");
            int color = selected ? NAV_ACTIVE : NAV_NORMAL;
            if (icon != null) icon.setColorFilter(color);
            if (text != null) {
                text.setTextColor(color);
                text.setTypeface(null, selected ? android.graphics.Typeface.BOLD : android.graphics.Typeface.NORMAL);
            }
            GradientDrawable bg = new GradientDrawable();
            bg.setCornerRadius(dp(16));
            bg.setColor(selected ? NAV_ACTIVE_BG : Color.TRANSPARENT);
            item.setBackground(bg);
            item.setSelected(selected);
        }
    }

    private void syncNativeNavFromPage() {
        if (webView == null) return;
        webView.evaluateJavascript(FIND_ACTIVE_NAV_JS, value -> {
            if (value == null) return;
            String key = value.replace("\"", "").trim();
            if (!key.isEmpty()) setActiveNav(key);
        });
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setBlockNetworkImage(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setUserAgentString(settings.getUserAgentString() + " BelayaMglaAndroid/4.1");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            try {
                ServiceWorkerController.getInstance().getServiceWorkerWebSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
                ServiceWorkerController.getInstance().getServiceWorkerWebSettings().setBlockNetworkLoads(false);
            } catch (Throwable ignored) { }
        }

        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);
        cookies.setAcceptThirdPartyCookies(webView, true);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.setVisibility(newProgress >= 90 ? View.GONE : View.VISIBLE);
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUri(request.getUrl());
            }
            @Override @SuppressWarnings("deprecation") public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUri(Uri.parse(url));
            }
            @Override public void onPageCommitVisible(WebView view, String url) {
                super.onPageCommitVisible(view, url);
                if (isSiteUrl(url)) view.evaluateJavascript(PERFORMANCE_JS, null);
            }
            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (!url.startsWith("file:///android_asset/")) {
                    offlineShown = false;
                    view.evaluateJavascript(PERFORMANCE_JS, null);
                    view.evaluateJavascript(PREFETCH_JS, null);
                    syncNativeNavFromPage();
                }
            }
            @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request.isForMainFrame() && !offlineShown) {
                    offlineShown = true;
                    view.loadUrl("file:///android_asset/offline.html");
                }
            }
        });

        webView.setDownloadListener(new DownloadListener() {
            @Override public void onDownloadStart(String url, String userAgent, String contentDisposition,
                                                  String mimetype, long contentLength) {
                openExternal(Uri.parse(url));
            }
        });
    }

    private boolean samePath(String a, String b) {
        try {
            String pa = Uri.parse(a).getPath();
            String pb = Uri.parse(b).getPath();
            return pa != null && pa.equals(pb);
        } catch (Exception e) { return false; }
    }

    private boolean isSiteUrl(String url) {
        if (url == null) return false;
        try { return SITE_HOST.equalsIgnoreCase(Uri.parse(url).getHost()); }
        catch (Exception e) { return false; }
    }

    private boolean handleUri(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();
        if (("https".equals(scheme) || "http".equals(scheme)) && SITE_HOST.equals(host)) return false;
        if ("about".equals(scheme) || "data".equals(scheme) || "blob".equals(scheme)) return false;
        openExternal(uri);
        return true;
    }

    private void openExternal(Uri uri) {
        try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
        catch (ActivityNotFoundException e) {
            Toast.makeText(this, "Не удалось открыть ссылку", Toast.LENGTH_SHORT).show();
        }
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @Override protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
